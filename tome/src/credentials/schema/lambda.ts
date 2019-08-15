import { Configuration, KEY } from './base';

export interface Model {
  API_PATH: string;
  API_ENV: string;
  API_KEY: string;
}

export const configuration: Configuration<Model> = {
  key: KEY.LAMBDA,
  secrets: [],
};
