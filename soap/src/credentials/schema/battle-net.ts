import { Configuration, KEY } from './base';

export interface Model {
  readonly [key: string]: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

export const configuration: Configuration<Model> = {
  key: KEY.BATTLENET,
  secrets: ['CLIENT_SECRET'],
};
