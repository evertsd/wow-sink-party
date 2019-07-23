// import { api, Character } from '~/battle-net';
// import { bnet, firebaseAdmin } from '~/credentials/schema';
import { Party } from '~/firebase';
// import { CharacterService, EnvironmentService } from '~/services';
import { intializeFirebase } from './credentials';

const okResponse = (obj: object) => ({
  statusCode: 200,
  body: JSON.stringify(obj),
});

const updateParty = async (id: string) => {
  await intializeFirebase();

  const party = await Party.get(id);

  return { party };
};

export const handler = async (event: any) => {
  const partyId = event.pathParameters.id;

  try {
    const response = await updateParty(partyId);

    return okResponse(response);
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ message: e.message }) };
  }
};

/*
export const getCharacter = async (id: string, { access_token }: api.AccessToken) => {
  const { name, realm, region } = CharacterService.getId(id);

  return await Character.get(realm, name, { region, access_token });
};
*/
