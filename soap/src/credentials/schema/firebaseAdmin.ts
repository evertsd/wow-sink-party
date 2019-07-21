import { Configuration, KEY } from './base';

export interface Model {
  ID: string;
  URL: string;
  PRIVATE_KEY: string;
  CLIENT_EMAIL: string;
}

export const configuration: Configuration<Model> = {
  key: KEY.FIREBASE_ADMIN,
  secrets: ['PRIVATE_KEY'],
};
