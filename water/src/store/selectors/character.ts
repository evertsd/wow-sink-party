import { Selector } from './util';
import { Character } from '../schema';

export type Attributes = Character.Attributes;

export const get: Selector<Attributes | undefined> =
  (state, id: string) => state.character[id];
