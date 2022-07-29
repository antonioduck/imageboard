const path = require("path");
const express = require("express");
const { DataBrew } = require("aws-sdk");
const { uploader } = require("./middleware");
const app = express();
const PORT = process.env.PORT || 8080;
const s3 = require("./s3");

const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-safe");

app.use(express.static(path.join(__dirname, "public")));
// Add a static route for uploads dir!
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// const diskStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, path.join(__dirname, "uploads"));
//     },
//     filename: function (req, file, callback) {
//         uidSafe(24).then(function (uid) {
//             callback(null, uid + path.extname(file.originalname));
//         });
//     },
// });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/images", (req, res) => {
    db.getAllImages().then((results) => {
        // console.log(
        //     "the results of my GetAllImages in /get cities is:",
        //     results
        // );
        const data = results.rows;
        // console.log("the results I need in get/images is:", data);

        res.json(data);
    });
});

app.post("/image", uploader.single("photo"), s3.upload, (req, res) => {
    const { username, title, description } = req.body;
    const url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
    if (req.file) {
        db.addImage(url, username, title, description).then((result) => {
            console.log("result.rows: ", result.rows);
            res.json({
                success: true,
                status: "Image has successfully been uploaded",
                file: result.rows[0],
            });
        });
    } else {
        res.json({
            success: false,
            status: "Upload failed",
        });
    }
});

app.get("/images/:id", (req, res) => {
    console.log("what I am getting back from req.params : ", req.params);

    db.getImagesInformation(req.params.id)
        .then((results) => {
            console.log("the result rows are ", results.rows);
            res.json(results.rows[0]);
        })
        .catch((err) => {
            console.log("error in getImagesInformation", err);
        });
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}.`));
