import { combineReducers } from 'redux'
import * as Party from './party';

export interface State {
  [Party.key]: Party.State,
}

export const initialState = {
  [Party.key]: Party.initialState,
};

export const reducer = combineReducers({
  [Party.key]: Party.reducer,
});
