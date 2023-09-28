import { google } from 'googleapis';

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT ?? '{}');
const spreadsheetId = process.env.SPREADSHEET_ID ?? '';

export const getAuthenticatedClient = () => {
  return new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });
};

export const getAuthForSheet = () => ({
  auth: getAuthenticatedClient(),
  spreadsheetId,
});

export const getSheet = () => google.sheets({ version: 'v4', auth: getAuthenticatedClient() });
