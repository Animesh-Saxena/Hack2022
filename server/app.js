const express = require('express');
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../my-app/public")));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/front_end/public/index.html"));
})

app.use(express.json({
    type: ['application/json', 'text/plain']
}));

const endpoints = [
    require('./endpoints/uploadFile'),
    // require('./endpoints/transcribe'),
    // require('./endpoints/summarize'),
];


module.exports = app;