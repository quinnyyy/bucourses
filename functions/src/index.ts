import * as functions from 'firebase-functions';
import express = require('express')

const app: express.Application = express();

app.get('/test123', (request, response) => {
    response.send('wa zi wa zi');
});

export const test = functions.https.onRequest(app);
