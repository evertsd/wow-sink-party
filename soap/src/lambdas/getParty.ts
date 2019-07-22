import { kms } from '~/aws/sdk';
import { api, Character } from '~/battle-net';
import { bnet, firebaseAdmin } from '~/credentials/schema';
import { Firebase, Party } from '~/firebase';
import { CharacterService, EnvironmentService } from '~/services';

const okResponse = (obj: object) => ({
  statusCode: 200,
  body: JSON.stringify(obj),
});

export const handler = async (event: any) => {
  const partyId = event.pathParameters.id;
  await intializeFirebase();

  const party = await Party.get(partyId);

  console.log(JSON.stringify(event, null, 2));

  return okResponse({ party });
};

const intializeFirebase = async (): Promise<Firebase.Connection> => {
  const credentials = await EnvironmentService.mapModelToConfig<firebaseAdmin.Model>(
    kms.createDecrypt(),
    process.env as EnvironmentService.Model,
    firebaseAdmin.configuration,
  );

  return await Firebase.initialize(credentials);
};

export const getCharacter = async (id: string, { access_token }: api.AccessToken) => {
  const { name, realm, region } = CharacterService.getId(id);

  return await Character.get(realm, name, { region, access_token });
};

export const getBnetToken = async (): Promise<api.AccessToken> => {
  const credentials = await EnvironmentService.mapModelToConfig<bnet.Model>(
    kms.createDecrypt(),
    process.env as EnvironmentService.Model,
    bnet.configuration,
  );

  return await api.getToken(credentials);
};
