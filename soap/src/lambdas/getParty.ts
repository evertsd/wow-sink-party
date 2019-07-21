import { Environment } from '~/aws/sdk';
import { api, Character } from '~/battle-net';
import { bnet } from '~/credentials/schema';

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

  const credentials = await Environment.read<bnet.Model>(process.env, bnet.configuration);
  const { access_token } = await api.getToken(credentials);
  const character = await Character.get(realm, partyId, {
    region: api.DEFAULT_REGION,
    access_token,
  });

  console.log(JSON.stringify(event, null, 2));
  console.info('character', character);
  return okResponse({ character });
};
