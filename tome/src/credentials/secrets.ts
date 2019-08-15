import { credentials } from '~/secrets/bundle'; // import to include in bundle
import { Map, Model } from './schema';

export * from './schema';

export const DEFAULT_ENV = 'dev';

export const get = (key: string = DEFAULT_ENV): Model =>
  (credentials as Map)[key] ||
  credentials[DEFAULT_ENV];
