import { Configuration } from '~/aws-cli';
import * as Credentials from '~/credentials/secrets';
import { Environment, FilterService } from '~/services';

export enum Lambda {
  getParty = 'getParty',
}

interface Model { credentials: Credentials.KEY[]; }
type Map = { [L in Lambda]: Model };

export const map: Map = {
  [Lambda.getParty]: {
    credentials: [Credentials.KEY.BATTLENET],
  },
};

export const getEnvironment = async (
  lambda: Lambda,
  base: Environment.Model = {},
  env?: string,
): Promise<Environment.Model> => {
  const secrets = Credentials.get(env);
  const requiredSecrets = map[lambda].credentials;
  console.info('getEnvironment, requiredSecrets', requiredSecrets);

  const environments = await Promise.all(
    requiredSecrets
      .map(secret => mapSecretToEnvironment(secrets, secret))
      .filter(FilterService.notUndefined),
  );
  console.info('getEnvironment, environments', environments);

  return Object.assign({}, base, ...(environments));
};

export const mapSecretToEnvironment = (
  secrets: Credentials.Model,
  key: Credentials.KEY,
): Promise<Environment.Model> | undefined => {
  switch (key) {
  case Credentials.KEY.BATTLENET:
    return Configuration.bnet.getEnvironment(secrets[key]);
  default:
    return;
  }
};
