import { Model as Environment } from '~/services/environment';

export enum KEY {
  AWS = 'aws',
  BATTLENET = 'battlenet',
  FIREBASE = 'firebase',
  FIREBASE_ADMIN = 'firebaseAdmin',
}

export interface Configuration<K> {
  key: KEY;
  secrets: Array<keyof K>;
}

export const getPublicKeys = <T extends Environment>(model: T, configuration: Configuration<T>) =>
  Object.keys(model)
    .filter(key => !configuration.secrets.includes(key));

export const isKeySecret = <T extends Environment>(key: keyof T, configuration: Configuration<T>): boolean =>
  configuration.secrets.includes(key);
