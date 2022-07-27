const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

// Set up instructions for Multer to store uploaded files to the disk

// where should we store the newly uploaded files?
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(12).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

module.exports.uploader = multer({
    storage,
    // include some limits to prevent overwhelming our server
    limits: {
        fileSize: 2097152,
    },
});
