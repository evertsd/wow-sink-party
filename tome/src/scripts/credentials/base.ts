import * as crypto from 'crypto';
import * as fs from 'fs';
import { mapAliasPathToAbsolute } from '../util';

export const CRYPTO_ALGORITHM = 'aes-256-cbc';
export const ENCODING_TYPE = 'hex';
const ENCRYPTED_SECRETS_FILEPATH = '~/secrets/encrypted-credentials.json';
const SECRETS_FILEPATH = '~/secrets/credentials.json';

export interface EncryptedSecrets {
  credentials: string;
  key: string;
  iv: string;
}

export const createKey = () => crypto.randomBytes(32);
export const createIV = () => crypto.randomBytes(16);

export const getSecrets = () => require(SECRETS_FILEPATH);
export const setSecrets = (stringifiedSecrets: string) => {
  const secrets = JSON.parse(stringifiedSecrets);

  return new Promise((resolve, reject) =>
    fs.writeFile(
      mapAliasPathToAbsolute(SECRETS_FILEPATH),
      JSON.stringify(secrets, null, 2),
      err => err ? reject(err) : resolve(secrets),
    ),
  );
};

export const getEncryptedSecrets = (): EncryptedSecrets =>
  require(ENCRYPTED_SECRETS_FILEPATH);

export const setEncryptedSecrets = (secrets: EncryptedSecrets) => {
  console.log(secrets.key);
  console.log(secrets.iv);
  const safeSecrets: EncryptedSecrets = { ...secrets, key: '', iv: '' };

  return new Promise((resolve, reject) =>
    fs.writeFile(
      mapAliasPathToAbsolute(ENCRYPTED_SECRETS_FILEPATH),
      JSON.stringify(safeSecrets, null, 2),
      err => err ? reject(err) : resolve(safeSecrets),
    ),
  );
};
