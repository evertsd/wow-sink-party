import { connection } from '../connection';

export enum KEY {
  bnet = 'battlenet',
  firebase = 'firebase',
}

export interface Environment<K = string> { [key: string]: K; }

export const toEnvironmentKey = (...keys: string[]): string => keys.map(k => k.toUpperCase()).join('_');

export const encryptVariable = async (variable: string) => {
  const response = await connection.aws.command(
    `kms encrypt --key-id ${connection.credentials.KMS} --plaintext "${variable}"`,
  );

  return response.object.CiphertextBlob;
};

export const toEnvironment = async (creds: Environment, secretCreds: string[], parent: KEY) => {
  const credTuples = Object.keys(creds)
    .filter(k => !secretCreds.includes(k))
    .map(k => [toEnvironmentKey(parent, k), creds[k]]);

  const secretTuples = await Promise.all(secretCreds
    .filter(secret => creds[secret] !== undefined)
    .map(secret => getSecretTuple(toEnvironmentKey(parent, secret), creds[secret])),
  );

  return credTuples
    .concat(secretTuples)
    .reduce(reduceTuplesToEnvironment, {});
};

const getSecretTuple = async (key: string, rawValue: string) => {
  const value = await encryptVariable(rawValue);

  return [key, value];
};

const reduceTuplesToEnvironment = (environment: Environment, [key, value]: string[]): Environment => {
  environment[key] = value;

  return environment;
};
