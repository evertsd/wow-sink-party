import { Attributes, save } from './schema';
import { Database } from '../database';

export * from './schema';

export const set = async (id: number, character: Attributes) => {
  const payload = save(character);

  try {
    await Database.characters.doc(`${id}`).set(payload);
  } catch (e) {
    console.log(`Character.set, error: ${e}`);
  }
};
