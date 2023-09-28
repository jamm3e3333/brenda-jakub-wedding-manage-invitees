
import * as functions from 'firebase-functions/v2';
import server from './server';

export const api = functions.https.onRequest(server);
