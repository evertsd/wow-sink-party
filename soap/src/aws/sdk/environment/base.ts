import * as AWS from 'aws-sdk';
import * as credentials from '~/credentials/schema';
import { Environment } from '~/services';

export const decryptVariable = async (variable: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const kms = new AWS.KMS();

    const params = {
      CiphertextBlob: Buffer.from(variable),
    };
    console.log('decryptVariable, CiphertextBlob', params);
    kms.decrypt(params, (err, data) => {
      console.info('decryptVariable, err', err, data);
      if (err) { return reject(err); }

      resolve(data.Plaintext as string);
    });
  });

export const getCredentials = async <T extends Environment.Model>(
  environment: Environment.Model,
  configuration: credentials.Configuration<T>,
): Promise<T> => {
  const { key, secrets } = configuration;
  const credentialKeys = Object.keys(environment)
    .filter(k => k.indexOf(`${key.toUpperCase()}_`) === 0);

  const credTuples = credentialKeys
    .filter(k => !credentials.isKeySecret(k.slice(key.length + 1), configuration))
    .map(k => [k, environment[k]]);

  const secretTuples = await Promise.all(secrets
    .map(secret => Environment.flattenKey(key, secret as string))
    .filter(secret => environment[secret] !== undefined)
    .map(secret => decryptSecretTuple(secret, environment[secret] as string)),
  );

  return credTuples
    .concat(secretTuples)
    .map(k => k.slice(parent.length + 1))
    .reduce(Environment.reduceTuples, {}) as T;
};

const decryptSecretTuple = async (key: string, rawValue: string): Promise<Environment.Tuple> => {
  const value = await decryptVariable(rawValue);

  return [key, value];
};
