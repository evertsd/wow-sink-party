import * as dayjs from 'dayjs';
import * as bnet from '~/battle-net';
import * as firebase from '~/firebase';
import { notUndefined } from '../filter';

export const perform = async (id: string, token: bnet.api.AccessToken) => {
  const party = await firebase.Party.get(id);

  const characterUpdates = (await Promise.all(
    party.members.map(member => getCharacter(member, token)),
  )).filter(notUndefined);

  const didUpdateCharacter = Boolean(characterUpdates.find(([_, du]) => du));
  const characters = characterUpdates.map(([character]) => character);

  if (didUpdateCharacter) {
    party.modifiedAt = firebase.Connection.now();

    firebase.Party.update(id, { modifiedAt: party.modifiedAt });
  }

  return { party, characters, didUpdate: didUpdateCharacter };
};

type CharacterUpdate = [firebase.Character.Model, boolean];
export const getCharacter = async (
  id: string,
  { access_token }: bnet.api.AccessToken,
): Promise<CharacterUpdate | undefined> => {
  const [name, realm, region] = id.split(':');

  try {
    const character = await firebase.Character.getOrDefault(id, undefined);
    if (character && !shouldUpdateCharacter(character)) { return [character, false]; }
    const data = await bnet.Character.get(realm, name, { region, access_token });

    const updatedCharacter: firebase.Character.Model = {
      ...(character || {}),
      ...mapToFirebaseModel(data),
      createdAt: (character && character.createdAt) || firebase.Connection.now(),
      modifiedAt: firebase.Connection.now(),
    };

    await firebase.Character.set(id, updatedCharacter);

    return [updatedCharacter, true];
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const shouldUpdateCharacter = (character: firebase.Character.Model) => {
  if (!character.modifiedAt) { return true; }
  const modifiedAt = firebase.mapTimestampToDate(character.modifiedAt);
  const hoursSinceUpdate = dayjs().diff(modifiedAt, 'h', true);

  return hoursSinceUpdate > 1;
};

export const mapToFirebaseModel = (character: bnet.Character.Model): firebase.Character.Model => ({
  // achievementPoints: character.achievement_points,
  klass: character.character_class.name,
  experience: character.experience,
  lastLoginTimestamp: character.last_login_timestamp,
  level: character.level,
  name: character.name,
});
