// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const gcsUri = 'gs://lecture-summarizer/output.raw';
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
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
async function fuckyou(){
// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
const [operation] = await client.longRunningRecognize(request);
// Get a Promise representation of the final result of the job
const [response] = await operation.promise();
console.log(response)
const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
console.log(`Transcription: ${transcription}`);}
fuckyou().then(r => {});