import { Model, load, save } from './schema';
import { Database } from '../database';

export * from './schema';

export const get = async (id: string): Promise<Model> => {
  console.info('Database.parties.doc(id)', id);
  const doc = await Database.parties.doc(id).get();
  console.log('Database.parties.doc(id).get() finished');
  return load(doc);
};

export const set = (id: string, party: Model) => {
  const payload = save(party);

  return Database.parties.doc(id).set(payload);
};
