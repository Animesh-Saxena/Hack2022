const express = require("express");
const app = express();
const path = require("path");
const Speech = require('@google-cloud/speech');
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const ffmpeg = require("ffmpeg")
const src = path.join(__dirname, "views");
app.use(express.static(src));

let keyFilename = "application_default_credentials.json"; // Get this from Google Cloud -> Credentials -> Service Accounts

const client = new Speech.SpeechClient({keyFilename});

const multer = Multer({
    storage: Multer.diskStorage({destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}),
    limits: {
        fileSize: 500 * 1024 * 1024, // No larger than 500mb, change as you need
    },
});

let projectId = "thermal-slice-368418"; // Get this from Google Cloud
const storage = new Storage({
    projectId,
    keyFilename,
});
const bucket = storage.bucket("lecture-summarizer"); // Get this from Google Cloud -> Storage

const gcsUri = 'gs://lecture-summarizer/output.raw';
const encoding = 'LINEAR16';
const sampleRateHertz = 44100;
const languageCode = 'en-US';

const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };
  
  const audio = {
    uri: gcsUri,
  };
  
  const request = {
    config: config,
    audio: audio,
  };
  

function uploadFile(app) {
// Streams file upload to Google Storage
    app.get("/uploadFile", (req, res) => {
        console.log('bruh');
    });
    app.post("/uploadFile", multer.single("filename"), (req, res) => {
        console.log("Made it /uploadFile");
        try {
            if (req.file) {
                console.log(req.file)
                var process = new ffmpeg(req.file.path);
                process.then(function (video) {
                    console.log('The video is ready to be processed');
                    video.addCommand('-f', 's16le')
                    video.addCommand('-acodec', 'pcm_s16le')
                    video.addCommand('-vn', '')
                    video.addCommand('-ac', '1')
                    video.addCommand('-ar', '44100')
                    video.save('./uploads/outputs2.raw', function (error, file) {
                        if (!error){
                            console.log('Audio file: ' + file);
                            console.log("File found, trying to upload...");
                            bucket.upload('./uploads/outputs2.raw', {destination: 'output.raw'})
                            .then(async (resp) => {
                                const [operation] = await client.longRunningRecognize(request);
                                // Get a Promise representation of the final result of the job
                                const [response] = await operation.promise();
                                const transcription = response.results
                                .map(result => result.alternatives[0].transcript)
                                .join('\n');
                                console.log(`Transcription: ${transcription}`);
                                res.status(200).json({'body':transcription})
                            })
                            .then((res) => res)
                            .catch((error) => console.log(error))
                        }
                            else{
                            console.log("error: ", error)
                        }
                    })                    
                }, function (err) {
                    console.log('Error: ' + err);
                });
            } else throw "error with file";
        } catch (error) {
            console.log("ERROR HERE")
            console.log(error)
            res.status(500).send(error);
        }
    });
}

module.exports = uploadFile;