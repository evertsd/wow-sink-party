export interface ICredentials {
  ID: string;
  KEY: string;
  DOMAIN: string;
  URL: string;
  BUCKET: string;
  SENDER: string;
  GOOGLE_PROVIDER_ID: string;
}

export const credentials = {
  ID: process.env.REACT_APP_FIREBASE_ID,
  KEY: process.env.REACT_APP_FIREBASE_KEY,
  DOMAIN: process.env.REACT_APP_FIREBASE_DOMAIN,
  URL: process.env.REACT_APP_FIREBASE_URL,
  BUCKET: process.env.REACT_APP_FIREBASE_BUCKET,
  SENDER: process.env.REACT_APP_FIREBASE_SENDER,
  GOOGLE_PROVIDER_ID: process.env.REACT_APP_FIREBASE_GOOGLE_PROVIDER_ID,
} as ICredentials;
