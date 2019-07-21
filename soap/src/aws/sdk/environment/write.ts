import * as AWS from 'aws-sdk';
import * as Credentials from '~/credentials/schema';
import { Environment } from '~/services';

export const write = async <T extends Environment.Model>(
  kmsKey: string,
  credentials: T,
  configuration: Credentials.Configuration<T>,
): Promise<Environment.Model> => {
  const { key, secrets } = configuration;
  const publicTuples = Object.keys(credentials)
    .filter(k => !Credentials.isKeySecret(k, configuration))
    .map(k => [Environment.flattenKey(key, k), credentials[k]]);

  const secretTuples = await Promise.all(secrets
    .filter(secret => credentials[secret] !== undefined)
    .map(secret => getSecretTuple(
      kmsKey,
      Environment.flattenKey(key, secret as string),
      credentials[secret] as string),
    ),
  );

  return publicTuples
    .concat(secretTuples)
    .reduce(Environment.reduceTuples, {});
};

export const encrypt = async (KeyId: string, Plaintext: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const kms = new AWS.KMS();

    kms.encrypt({ KeyId, Plaintext }, (err, response) => {
      if (err) { return reject(err); }
      if (!response.CiphertextBlob) { return reject('CiphrtextBlob is undefiend'); }

      const data = Buffer.from(response.CiphertextBlob as string).toJSON().data;

      resolve(JSON.stringify(data));
    });
  });

const getSecretTuple = async (kmsKey: string, key: string, rawValue: string): Promise<Environment.Tuple> => {
  const value = await encrypt(kmsKey, rawValue);

  return [key, value];
};
