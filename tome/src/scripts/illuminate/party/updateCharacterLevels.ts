import 'module-alias/register';
import { v4 as uuid } from 'uuid';
import * as Credentials from '~/credentials/secrets';
import { Character, CharacterLevelHistory, Connection, LevelUploadHistory } from '~/firebase';
import { notUndefined } from '~/services/filter';
import * as secrets from '../secrets';

Connection.initialize(Credentials.get().firebaseAdmin);

type TUpdateCharacterLevel = (
  id: string,
  level: secrets.CharacterLevelJSON,
) => Promise<CharacterLevelHistory.Model | undefined>;

const createUploadLevelHistory = async ({ characters }: secrets.CharacterLevelsJSON) => {
  const promises = Object.keys(characters).map(id =>
    updateCharacterLevel(id, characters[id]),
  );

  const characterLevelHistory = (await Promise.all(promises)).filter(notUndefined);
  const levelUploadHistory = {
    id: uuid(),
    createdAt: Connection.now(),
    modifiedAt: Connection.now(),
    characterLevelHistory: characterLevelHistory
      .map(clh => clh.id)
      .filter(notUndefined),
  };

  await LevelUploadHistory.set(levelUploadHistory.id, levelUploadHistory);
};

const updateCharacterLevel: TUpdateCharacterLevel = async (id, level) => {
  const doc = await Connection.Database.characters.doc(id).get();
  const character = doc.exists ? Character.load(doc) : undefined;

  if (!character || character.level > level) { return; }

  try {
    await Character.update(id, { level });

    const characterLevelHistory = {
      id: uuid(),
      createdAt: Connection.now(),
      modifiedAt: Connection.now(),
      character: id,
      level,
      experience: 0,
    };

    await CharacterLevelHistory.set(
      characterLevelHistory.id,
      characterLevelHistory,
    );

    return characterLevelHistory;
  } catch (e) {
    console.error(e);
    return;
  }
};

createUploadLevelHistory(secrets.getCharacterLevels())
  .then(console.log);
