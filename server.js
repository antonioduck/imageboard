const path = require("path");
const express = require("express");
const { DataBrew } = require("aws-sdk");
const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./db");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// app.get("/cities", (req, res) => {
//   const data = require("./weather.json");
//   res.json(data);
// });

app.get("/images", (req, res) => {
  db.getAllImages().then((results) => {
    console.log("the results of my GetAllImages in /get cities is:", results);
    const data = results.rows;
    console.log("the results I need in get/images is:", data);

    res.json(data);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => console.log(`I'm listening on port ${PORT}.`));
