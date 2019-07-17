import * as Credentials from '~/credentials';

export enum Lambda {
  getParty = 'getParty',
}

interface Environment { [key: string]: string; }
interface Model { credentials: Credentials.Key[]; }
type Map = { [L in Lambda]: Model };

export const map: Map = {
  [Lambda.getParty]: {
    credentials: [Credentials.Key.BATTLENET, Credentials.Key.FIREBASE],
  },
};

export const getEnvironment = (lambda: Lambda, base: Environment = {}, env?: string): Environment => {
  const secrets = Credentials.get(env);
  const requiredSecrets = map[lambda].credentials;

  return requiredSecrets.reduce((environment, key) => {
    const secret = secrets[key] as unknown as Environment;

    Object.keys(secret)
      .forEach(sk => environment[toEnvironmentKey(key, sk)] = secret[sk]);

    return environment;
  }, base);
};

const toEnvironmentKey = (...keys: string[]) => keys.map(k => k.toUpperCase()).join('_');
