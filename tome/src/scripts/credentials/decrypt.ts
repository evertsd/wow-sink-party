import 'module-alias/register';
import * as crypto from 'crypto';
import * as base from './base';

const decrypt = (encrypted: base.EncryptedSecrets) => {
  const key = Buffer.from(encrypted.key, base.ENCODING_TYPE);
  const iv = Buffer.from(encrypted.iv, base.ENCODING_TYPE);
  const value = Buffer.from(encrypted.credentials, base.ENCODING_TYPE);
  const decipher = crypto.createDecipheriv(base.CRYPTO_ALGORITHM, key, iv);

  return Buffer.concat([
    decipher.update(value),
    decipher.final(),
  ]).toString();
};

const secrets = decrypt(base.getEncryptedSecrets());

base.setSecrets(secrets);
