import 'module-alias/register';
import * as Credentials from '~/credentials/secrets';
import { Character, Connection, Party } from '~/firebase';
import * as secrets from '../secrets';

Connection.initialize(Credentials.get().firebaseAdmin);

const setParty = async (id: string, template: secrets.PartyTemplate) => {
  const doc = await Connection.Database.parties.doc(id).get();
  const party = mapTemplateToParty(template);

  if (!doc.exists) {
    party.createdAt = Connection.now();

    return await Party.set(id, party);
  }

  return await Party.update(id, {
    ...party,
    members: party.members.map(c => Connection.Database.characters.doc(c)),
  } as Partial<Party.Attributes & Party.Refs>);
};

const findOrCreateCharacter = async (id: string, template: secrets.CharacterTemplate) => {
  const doc = await Connection.Database.characters.doc(id).get();

  if (doc.exists) { return; }

  return await Character.set(id, {
    ...template,
    createdAt: Connection.now(),
    modifiedAt: Connection.now(),
  });
};

const mapTemplateToParty = (template: secrets.PartyTemplate): Party.Model => ({
  name: template.name,
  realm: template.realm,
  region: template.region,
  members: Object.keys(template.characters),
  modifiedAt: Connection.now(),
});

const partyJSON = secrets.getParty();

const savePartyAndCharacters = async (id: string, template: secrets.PartyTemplate) => {
  await setParty(id, template);

  const saveCharacterPromises = Object.keys(template.characters).map(cid =>
    findOrCreateCharacter(cid, template.characters[cid]),
  );

  return await Promise.all(saveCharacterPromises);
};

const savePartyPromises = Object.keys(partyJSON).map(id =>
  savePartyAndCharacters(id, partyJSON[id]),
);

Promise.all(savePartyPromises).then(console.log);
