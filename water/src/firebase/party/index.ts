import { Model, load, save } from './schema';
import { Database } from '../database';

export * from './schema';

export const set = (id: string, party: Model) => {
  const payload = save(party);

  return Database.parties.doc(id).set(payload);
};

export const get = async (id: string) => {
  const doc = await Database.parties.doc(id).get();

  return load(doc);
}
