import { Attributes, Model, load, save } from './schema';
import { Database } from '../connection';

export * from './schema';

export const get = async (id: string): Promise<Model> => {
  const doc = await Database.characters.doc(id).get();

  return load(doc);
};

export const getOrDefault = async <K = undefined>(id: string, value: K): Promise<Model | K> => {
  const doc = await Database.characters.doc(id).get();

  return doc.exists ? load(doc) : value;
};

export const set = async (id: string, character: Model) => {
  const payload = save(character);

  try {
    await Database.characters.doc(id).set(payload);
  } catch (e) {
    console.log(`Character.set, error: ${e}`);
  }
};

export const update = async (id: string, party: Partial<Attributes>) =>
  Database.characters.doc(id).update(party);
