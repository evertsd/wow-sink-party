import 'module-alias/register';
import * as bnet from '~/battle-net/api';
import * as BnetCharacter from '~/battle-net/character';
import * as json from '~/files/parties.json';
import * as FirebaseCharacter from '~/firebase/character';
import * as Party from '~/firebase/party';
import * as CharacterService from '~/services/character';

interface PartyMemberJSON {
  name: string;
  realm: string;
}

interface PartyJSON {
  name: string;
  members: PartyMemberJSON[];
  region: string;
}

interface PartiesJSON {
  parties: { [id: string]: PartyJSON; };
}

const saveParty = async (id: string, party: PartyJSON) => {
  const token = await bnet.getToken(party.region);
  const qs = { region: party.region, access_token: token.access_token };

  const characters = await Promise.all(party.members.map(member =>
    BnetCharacter.get(member.realm, member.name, qs),
  ));

  await Promise.all(characters.map(character =>
    FirebaseCharacter.set(
      character.id,
      CharacterService.mapToFirebaseModel(character),
    ),
  ));

  return await Party.set(id, {
    ...party,
    members: characters.map(character => `${character.id}`),
  });
};

const { parties } = json as PartiesJSON;

Object.keys(parties).forEach(partyId => {
  saveParty(partyId, parties[partyId]);
});
