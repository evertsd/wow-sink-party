import * as Character from './character';
import { Selector } from './util';

type CharacterSort = (a: Character.Attributes, b: Character.Attributes) => number;
type IdSort = (a: string, b: string) => number;
type SortWrapper = Selector<IdSort>;

enum Type {
  LEVEL  = 'LEVEL',
}

export const create: Selector<IdSort> =
  (state, sortType?: Type, isAscending: boolean = false) => {
    switch (sortType) {
    default:
      return byLevel(state, isAscending);
    }
  };

const byLevel: Selector<IdSort> = (state, isAscending: boolean) =>
  wrap(state, (a: Character.Attributes, b: Character.Attributes) =>
    isAscending ?
      a.level - b.level :
      b.level - a.level,
  );

const wrap: SortWrapper = (state, sort: CharacterSort) =>
  (idA, idB) => {
    const a = Character.get(state, idA);
    const b = Character.get(state, idB);

    if (!a) { return -1; }
    if (!b) { return 1; }

    return sort(a, b);
  };
