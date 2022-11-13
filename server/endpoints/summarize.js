const express = require("express");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
console.log(process.env);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const MAX_REQUEST = 2048;
const MAX_RESPONSE = 256;
const INTERVAL = 0.9;
const MAX_TOKENS = INTERVAL * (MAX_REQUEST - MAX_RESPONSE - 6);

function summarize(app) {
    app.get('/summarize',
        async (req, res) => {
        console.log(req.body);
        let splits = split(req.body.text);
        let response = "";
        for (let i = 0; i < splits.length; i++) {
            const completion = await openai.createCompletion({
                model: "text-curie-001",
                prompt: generatePrompt(splits[i]),
                temperature: 0.1,
                max_tokens: MAX_RESPONSE,
            });
            response += completion.data.choices[0].text;
        }
        res.status(200).json({result: response});
        });
}

function split(text){
    const tokens = text.split(/\s+/);
    const intervals = Math.ceil(tokens.length/MAX_TOKENS);
    const interval_length = Math.ceil(tokens.length/intervals);
    let result = [];
    for (let i = 0; i < intervals; i++){
        result.push(tokens.slice(i*interval_length, Math.min((i+1)*interval_length, tokens.length)).join());
    }
    return result
}

function generatePrompt(text) {
    return `${text}
  Summarize the above lecture as notes:`;
}

module.exports = summarize;