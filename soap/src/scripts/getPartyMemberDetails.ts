import 'module-alias/register';
import * as bnet from '~/battle-net/api';
import * as BnetCharacter from '~/battle-net/character';
import * as json from '~/files/parties.json';
import * as FirebaseCharacter from '~/firebase/character';
import * as Party from '~/firebase/party';
import * as CharacterService from '~/services/character';

interface PartyJSON {
  name: string;
  members: string[];
  region: string;
}

interface PartiesJSON {
  parties: { [id: string]: PartyJSON; };
}

const saveCharacter = async (
  id: string,
  { access_token }: bnet.AccessToken,
  defaultRegion: string,
) => {
  const [name, realm, region = defaultRegion] = id.split(FirebaseCharacter.ID_DELIMETER);

  const character = await BnetCharacter.get(realm, name, { region, access_token });

  return await FirebaseCharacter.set(id, CharacterService.mapToFirebaseModel(character));
};

const saveParty = async (id: string, party: PartyJSON) => {
  const token = await bnet.getToken(party.region);

  await Promise.all(party.members.map(member =>
    saveCharacter(member, token, party.region),
  ));

  return await Party.set(id, party);
};

const { parties } = json as PartiesJSON;

Object.keys(parties).forEach(partyId => {
  saveParty(partyId, parties[partyId]);
});
