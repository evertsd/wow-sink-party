import { kms } from '~/aws/sdk';
import * as Credentials from '~/credentials/secrets';
import { EnvironmentService, FilterService } from '~/services';

export enum Lambda {
  getParty = 'getParty',
}

interface Model { credentials: Credentials.KEY[]; }
type Map = { [L in Lambda]: Model };

export const map: Map = {
  [Lambda.getParty]: {
    credentials: [Credentials.KEY.BATTLENET, Credentials.KEY.FIREBASE_ADMIN],
  },
};

export const getEnvironment = async (
  lambda: Lambda,
  base: EnvironmentService.Model = {},
  env?: string,
): Promise<EnvironmentService.Model> => {
  const secrets = Credentials.get(env);
  const requiredSecrets = map[lambda].credentials;
  const encrypt = kms.createEncrypt(secrets.aws.KMS);
  const environments = await Promise.all(
    requiredSecrets
      .map(secret => mapSecretToEnvironment(encrypt, secrets, secret))
      .filter(FilterService.notUndefined),
  );

  return Object.assign({}, base, ...environments);
};

export const mapSecretToEnvironment = (
  transform: EnvironmentService.Transform,
  secrets: Credentials.Model,
  key: Credentials.KEY,
): Promise<EnvironmentService.Model> | undefined => {
  switch (key) {
  case Credentials.KEY.BATTLENET:
    return EnvironmentService.mapConfigToModel(
      transform,
      secrets[key],
      Credentials.bnet.configuration,
    );
  case Credentials.KEY.FIREBASE_ADMIN:
    return EnvironmentService.mapConfigToModel(
      transform,
      secrets[key],
      Credentials.firebaseAdmin.configuration,
    );
  default:
    return;
  }
};
