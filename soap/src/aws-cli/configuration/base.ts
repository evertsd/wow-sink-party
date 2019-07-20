import * as Credentials from '~/credentials/schema';
import { Environment } from '~/services';
import { connection } from '../connection';

export const encryptVariable = async (variable: string) => {
  const response = await connection.aws.command(
    `kms encrypt --key-id ${connection.credentials.KMS} --plaintext "${variable}"`,
  );

  return response.object.CiphertextBlob;
};

export const toEnvironment = async <T extends Environment.Model>(
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
      Environment.flattenKey(key, secret as string),
      credentials[secret] as string),
    ),
  );

  return publicTuples
    .concat(secretTuples)
    .reduce(Environment.reduceTuples, {});
};

const getSecretTuple = async (key: string, rawValue: string): Promise<Environment.Tuple> => {
  const value = await encryptVariable(rawValue);

  return [key, value];
};
