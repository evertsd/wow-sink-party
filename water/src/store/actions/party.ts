import factory from 'typescript-fsa';
import { Party } from '~/firebase/schema';

const create = factory();

export enum Type {
  SET = 'PARTY_SET',
}

export const set = create<Party.Model>(Type.SET);
