import * as Credentials from '~/credentials/schema';

export type Model = Record<string, string>;
export type Tuple<K> = [keyof K, K[keyof K]];
export type Transform = (variable: string) => Promise<string>;

export type Config =
  Credentials.aws.Model | Credentials.bnet.Model |
  Credentials.firebase.Model | Credentials.firebaseAdmin.Model;

export const mapConfigToModel = async <T extends Config>(
  transform: Transform,
  credentials: T,
  configuration: Credentials.Configuration<T>,
): Promise<Model> => {
  const { key, secrets } = configuration;
  const publicTuples = getKeys(credentials)
    .filter(isPublicKey(configuration))
    .map(k => [flattenKey(key, k as string), credentials[k]]);

  const secretTuples = await Promise.all(secrets
    .filter(secret => credentials[secret] !== undefined)
    .map(secret => transformTuple(
      transform,
      flattenKey(key, secret as string),
      credentials[secret] as unknown as string,
    )),
  );

  return publicTuples
    .concat(secretTuples)
    .reduce(reduceTuples, {});
};

export const mapModelToConfig = async <T extends Config>(
  transform: Transform,
  environment: Model,
  configuration: Credentials.Configuration<T>,
): Promise<T> => {
  const { key, secrets } = configuration;
  const credentialKeys = Object.keys(environment)
    .filter(k => k.indexOf(`${key.toUpperCase()}_`) === 0);

  const publicTuples = credentialKeys
    .filter(k => isPublicKey(configuration)(k.slice(key.length + 1) as keyof T))
    .map(k => [k, environment[k]]);

  const secretTuples = await Promise.all(secrets
    .map(secret => flattenKey(key, secret as string))
    .filter(secret => environment[secret] !== undefined)
    .map(secret => transformTuple(transform, secret, environment[secret] as string)),
  );

  return publicTuples
    .concat(secretTuples)
    .map(([k, v]: Tuple<Model>) => [k.slice(key.length + 1), v])
    .reduce(reduceTuples, {}) as T;
};

const getKeys = <T extends object>(credentials: T) =>
  Object.keys(credentials) as Array<keyof T>;

const isPublicKey = <T>(configuration: Credentials.Configuration<T>) =>
  (key: keyof T): key is keyof T  => !configuration.secrets.includes(key);

const transformTuple = async (transform: Transform, key: string, value: string) => {
  const newValue = await transform(value);

  return [key, newValue];
};

const flattenKey = (...keys: string[]): string => keys.map(k => k.toUpperCase()).join('_');

const reduceTuples = (environment: Model, [key, value]: Tuple<Model>): Model => {
  environment[key] = value;

  return environment;
};
