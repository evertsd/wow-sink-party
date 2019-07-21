import { kms } from '~/aws/sdk';
import { api, Character } from '~/battle-net';
import { bnet } from '~/credentials/schema';
import { EnvironmentService } from '~/services';

const okResponse = (obj: object) => ({
  statusCode: 200,
  body: JSON.stringify(obj),
});

export const handler = async (event: any) => {
  const partyId = event.pathParameters.id;
  const realm = event.queryStringParameters.realm;
  console.info(
    'getParty variables',
    partyId,
    realm,
    process.env.BATTLENET_CLIENT_SECRET,
  );

  const decrypt = kms.createDecrypt();

  const credentials = await EnvironmentService.mapModelToConfig<bnet.Model>(
    decrypt,
    process.env as EnvironmentService.Model,
    bnet.configuration,
  );
  const { access_token } = await api.getToken(credentials);
  const character = await Character.get(realm, partyId, {
    region: api.DEFAULT_REGION,
    access_token,
  });

  console.log(JSON.stringify(event, null, 2));
  console.info('character', character);
  return okResponse({ character });
};
