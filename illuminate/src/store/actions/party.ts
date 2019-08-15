import factory from 'typescript-fsa';
import { Character, Party } from '~/firebase/schema';

const create = factory();

export enum Type {
  SET = 'PARTY_SET',
  SET_CHARACTER = 'PARTY_SET_CHARACTER',
}

export const set = create<Party.Model>(Type.SET);
export const setCharacter = create<Character.Attributes>(Type.SET_CHARACTER);
