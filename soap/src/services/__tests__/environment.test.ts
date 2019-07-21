import * as Credentials from '~/credentials/schema';
import { mapConfigToModel } from '../environment';

const bnetCredentials: Credentials.bnet.Model = {
  CLIENT_ID: 'test_client_id',
  CLIENT_SECRET: 'test_secret_id',
};

const transform = jest.fn(async (variable: string) => Promise.resolve(variable));

describe('mapConfigToModel', () => {
  it('maps public and secret keys', async () => {
    const model = await mapConfigToModel(
      transform,
      bnetCredentials,
      Credentials.bnet.configuration,
    );

    expect(transform).toHaveBeenCalledWith(bnetCredentials.CLIENT_SECRET);

    expect(model.BATTLENET_CLIENT_ID).toEqual(bnetCredentials.CLIENT_ID);
  });
});
