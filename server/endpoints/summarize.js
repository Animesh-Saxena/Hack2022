const express = require("express");
const app = express();
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const MAX_REQUEST = 2048;
const MAX_RESPONSE = 256;
const INTERVAL = 0.9;
const MAX_TOKENS = INTERVAL * (MAX_REQUEST - MAX_RESPONSE);

function summarize(app) {
    app.get('/summarize',
        async (req, res) => {
            const completion = await openai.createCompletion({
                model: "text-curie-001",
                prompt: generatePrompt(req.body.text),
                temperature: 0.1,
                max_tokens: MAX_RESPONSE,
            });
            res.status(200).json({result: completion.data.choices[0].text});
        });
}

function split(text){
    var tokens = text.split(/\s+/);
    return
}

function generatePrompt(text) {
    return `${text}
  Summarize the above lecture as notes:`;
}

modules.export = summarize;