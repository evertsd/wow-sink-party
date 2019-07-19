import { Configuration } from '~/aws-cli';
import * as Credentials from '~/credentials';
import { FilterService } from '~/services';

export enum Lambda {
  getParty = 'getParty',
}

interface Environment { [key: string]: string; }
interface Model { credentials: Configuration.KEY[]; }
type Map = { [L in Lambda]: Model };

export const map: Map = {
  [Lambda.getParty]: {
    credentials: [Configuration.KEY.bnet],
  },
};

export const getEnvironment = async (lambda: Lambda, base: Environment = {}, env?: string): Promise<Environment> => {
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
  key: Configuration.KEY,
): Promise<Environment> | undefined => {
  switch (key) {
  case Configuration.KEY.bnet:
    return Configuration.bnet.getEnvironment(secrets[key]);
  default:
    return;
  }
};
