import './secrets/bundle'; // import to include in bundle
import * as credentials from './secrets/credentials.json';

export enum Key {
  AWS = 'aws',
  BATTLENET = 'battlenet',
  FIREBASE = 'firebase',
}

export interface AWS {
  NAME: string;
  ACCESS_KEY_ID: string;
  ACCESS_KEY_SECRET: string;
  BUCKET: string;
  REGION: string;
  OUTPUT: string;
}

export interface BattleNet {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

export interface Firebase {
  ID: string;
  KEY_FILENAME: string;
  KEY: string;
  DOMAIN: string;
  URL: string;
  BUCKET: string;
  SENDER: string;
  GOOGLE_PROVIDER_ID: string;
}

export interface Model {
  [Key.AWS]: AWS;
  [Key.BATTLENET]: BattleNet;
  [Key.FIREBASE]: Firebase;
}

export interface Map {
  [env: string]: Model;
}

export const DEFAULT_ENV = 'dev';

export const get = (key: string = DEFAULT_ENV): Model =>
  (credentials as Map)[key] ||
  credentials[DEFAULT_ENV];
