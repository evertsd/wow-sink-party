import { Model, save } from './schema';
import { Database } from '../database';

export * from './schema';

export const set = (id: string, party: Model) => {
  const payload = save(party);

  return Database.parties.doc(id).set(payload);
};
