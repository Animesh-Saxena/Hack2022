const express = require("express");
const app = express();
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const src = path.join(__dirname, "views");
app.use(express.static(src));

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 500 * 1024 * 1024, // No larger than 500mb, change as you need
    },
});

let projectId = "thermal-slice-368418"; // Get this from Google Cloud
let keyFilename = "application_default_credentials.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
    projectId,
    keyFilename,
});
const bucket = storage.bucket("lecture-summarizer"); // Get this from Google Cloud -> Storage

function uploadFile(app) {
// Streams file upload to Google Storage
    app.get("/uploadFile", (req, res) => {
        console.log('bruh');
    });
    app.post("/uploadFile", multer.single("filename"), (req, res) => {
        console.log("Made it /uploadFile");
        try {
            if (req.file) {
                console.log("File found, trying to upload...");
                const blob = bucket.file(req.file.originalname);
                const blobStream = blob.createWriteStream();

                blobStream.on("finish", () => {
                    res.status(200).send("Success");
                    console.log("Success");
                });
                blobStream.end(req.file.buffer);
            } else throw "error with file";
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

module.exports = uploadFile;