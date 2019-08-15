import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Model } from '~/firebase/party/schema';
import * as Party from '../actions/party';

export interface State {
  [id: string]: Timestamped<Model>;
}

export const key = 'party';
export const initialState: State = {};

export const reducer = reducerWithInitialState(initialState)
  .case(Party.set, (state, party) => (!party.id ? state : {
    ...state,
    [party.id]: { ...party, setAt: +new Date() },
  }));
