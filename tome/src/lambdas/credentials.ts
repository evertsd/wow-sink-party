import { kms } from '~/aws/sdk';
import * as api from '~/battle-net/api';
import { bnet, firebaseAdmin } from '~/credentials/schema';
import * as Connection from '~/firebase/connection';
import { EnvironmentService } from '~/services';

export const intializeFirebase = async (): Promise<Connection.Model> => {
  const credentials = await EnvironmentService.mapModelToConfig<firebaseAdmin.Model>(
    kms.createDecrypt(),
    process.env as EnvironmentService.Model,
    firebaseAdmin.configuration,
  );

  return Connection.initialize(credentials);
};

export const getBnetToken = async (): Promise<api.AccessToken> => {
  const credentials = await EnvironmentService.mapModelToConfig<bnet.Model>(
    kms.createDecrypt(),
    process.env as EnvironmentService.Model,
    bnet.configuration,
  );

  return await api.getToken(credentials);
};
