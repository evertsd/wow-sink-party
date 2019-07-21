import { Configuration, KEY } from './base';

export interface Model {
  NAME: string;
  ACCESS_KEY_ID: string;
  ACCESS_KEY_SECRET: string;
  BUCKET: string;
  REGION: string;
  OUTPUT: string;
  KMS: string;
}

export const configuration: Configuration<Model> = {
  key: KEY.AWS,
  secrets: ['ACCESS_KEY_SECRET', 'KMS'],
};
