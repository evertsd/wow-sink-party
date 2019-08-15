import { combineReducers } from 'redux'
import * as Character from './character';
import * as Party from './party';

export interface State {
  [Character.key]: Character.State,
  [Party.key]: Party.State,
}

export const initialState = {
  [Character.key]: Character.initialState,
  [Party.key]: Party.initialState,
};

export const reducer = combineReducers({
  [Character.key]: Character.reducer,
  [Party.key]: Party.reducer,
});
