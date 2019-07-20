import { Configuration, KEY } from './base';

export interface Model {
  readonly [key: string]: string;
  ID: string;
  KEY_FILENAME: string;
  KEY: string;
  DOMAIN: string;
  URL: string;
  BUCKET: string;
  SENDER: string;
  GOOGLE_PROVIDER_ID: string;
}

export const configuration: Configuration<Model> = {
  key: KEY.FIREBASE,
  secrets: [],
};
