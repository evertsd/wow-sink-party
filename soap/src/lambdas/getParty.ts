import * as firebase from '~/firebase';
import { SyncPartyService } from '~/services/party';
import { getBnetToken, intializeFirebase } from './credentials';
import * as Response from './response';

export const thandler = async (_: any) => {
  await intializeFirebase();

  console.info('firebase.Connection.now()', firebase.Connection.now());
};

export const handler = async (event: any) => {
  const partyId = event.pathParameters.id;
  await intializeFirebase();
  const token = await getBnetToken();

  try {
    const response = await SyncPartyService.perform(partyId, token);

    return Response.ok(response);
  } catch (e) {
    return Response.unexpectedError(e);
  }
};
