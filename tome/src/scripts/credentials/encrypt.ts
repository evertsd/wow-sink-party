import 'module-alias/register';
import * as crypto from 'crypto';
import * as base from './base';

const encrypt = (value: string): base.EncryptedSecrets => {
  const key = base.createKey();
  const iv = base.createIV();
  const cipher = crypto.createCipheriv(base.CRYPTO_ALGORITHM, Buffer.from(key), iv);

  const credentials = Buffer.concat([
    cipher.update(value),
    cipher.final(),
  ]);

  return {
    key: key.toString(base.ENCODING_TYPE),
    iv: iv.toString(base.ENCODING_TYPE),
    credentials: credentials.toString(base.ENCODING_TYPE),
  };
};

const secrets = JSON.stringify(base.getSecrets());

base.setEncryptedSecrets(encrypt(secrets));
