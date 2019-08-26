import { Model, save } from './schema';
import { Database } from '../connection';

export * from './schema';

export const set = async (id: string, model: Model) => {
  const payload = save(model);

  try {
    await Database.levelUploadHistory.doc(id).set(payload);
  } catch (e) {
    console.log(`LevelUploadHistory.set, error: ${e}`);
  }
};
