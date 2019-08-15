import { Configuration, KEY } from './base';

export interface Model {
  PATH: string;
  KEY: string;
}

export const configuration: Configuration<Model> = {
  key: KEY.API_GATEWAY,
  secrets: [],
};
