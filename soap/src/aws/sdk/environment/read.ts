import * as AWS from 'aws-sdk';
import * as Credentials from '~/credentials/schema';
import { Environment } from '~/services';

export const read = async <T extends Environment.Model>(
  environment: Environment.Model,
  configuration: Credentials.Configuration<T>,
): Promise<T> => {
  const { key, secrets } = configuration;
  const credentialKeys = Object.keys(environment)
    .filter(k => k.indexOf(`${key.toUpperCase()}_`) === 0);

  const publicTuples = credentialKeys
    .filter(k => !Credentials.isKeySecret(k.slice(key.length + 1), configuration))
    .map(k => [k, environment[k]]);

  const secretTuples = await Promise.all(secrets
    .map(secret => Environment.flattenKey(key, secret as string))
    .filter(secret => environment[secret] !== undefined)
    .map(secret => decryptSecret(secret, environment[secret] as string)),
  );

  return publicTuples
    .concat(secretTuples)
    .map(([k, v]: Environment.Tuple) => [k.slice(key.length + 1), v])
    .reduce(Environment.reduceTuples, {}) as T;
};

export const decrypt = async (variable: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const kms = new AWS.KMS();

    const params = {
      CiphertextBlob: Buffer.from(JSON.parse(variable)),
    };

    kms.decrypt(params, (err, data) => {
      if (err) { return reject(err); }

      resolve(String(data.Plaintext));
    });
  });

const decryptSecret = async (key: string, rawValue: string): Promise<Environment.Tuple> => {
  const value = await decrypt(rawValue);

  return [key, value];
};
