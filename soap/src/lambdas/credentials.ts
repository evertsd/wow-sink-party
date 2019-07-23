import { kms } from '~/aws/sdk';
import * as api from '~/battle-net/api';
import { bnet, firebaseAdmin } from '~/credentials/schema';
import * as Firebase from '~/firebase/database';
import { EnvironmentService } from '~/services';

export const intializeFirebase = async (): Promise<Firebase.Connection> => {
  const credentials = await EnvironmentService.mapModelToConfig<firebaseAdmin.Model>(
    kms.createDecrypt(),
    process.env as EnvironmentService.Model,
    firebaseAdmin.configuration,
  );

  return Firebase.initialize(credentials);
};

export const getBnetToken = async (): Promise<api.AccessToken> => {
  const credentials = await EnvironmentService.mapModelToConfig<bnet.Model>(
    kms.createDecrypt(),
    process.env as EnvironmentService.Model,
    bnet.configuration,
  );

  return await api.getToken(credentials);
};
