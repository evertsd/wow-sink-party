import './secrets/bundle'; // import to include in bundle
import * as credentials from './secrets/credentials.json';

export interface IBattleNetCredentials {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

export interface IFirebaseCredentials {
  ID: string;
  KEY_FILENAME: string;
  KEY: string;
  DOMAIN: string;
  URL: string;
  BUCKET: string;
  SENDER: string;
  GOOGLE_PROVIDER_ID: string;
}

export interface ICredential {
  battlenet: IBattleNetCredentials;
  firebase: IFirebaseCredentials;
}

export interface ICredentials {
  [key: string]: ICredential;
}

const DEFAULT_CREDENTIAL_KEY = 'dev';

export const getCredentials = (key: string = DEFAULT_CREDENTIAL_KEY): ICredential =>
  (credentials as ICredentials)[key] ||
  credentials[DEFAULT_CREDENTIAL_KEY];
