import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Attributes } from '~/firebase/character/schema';
import * as Party from '../actions/party';

export interface State {
  [id: string]: Timestamped<Attributes>;
}

export const key = 'character';
export const initialState: State = {};

export const reducer = reducerWithInitialState(initialState)
  .case(Party.setCharacter, (state, character) => (!character.id ? state : {
    ...state,
    [character.id]: { ...character, setAt: +new Date() },
  }));
