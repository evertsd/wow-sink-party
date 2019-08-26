import { Model, save } from './schema';
import { Database } from '../connection';

export * from './schema';

export const set = async (id: string, model: Model) => {
  const payload = save(model);

  try {
    await Database.characterLevelHistory.doc(id).set(payload);
  } catch (e) {
    console.log(`CharacterLevelHistory.set, error: ${e}`);
  }
};
