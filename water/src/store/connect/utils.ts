import { MapStateToProps as ReduxMapStateToProps, connect } from 'react-redux';
import { State } from '../reducers';

export type MapStateToProps<
  S extends object,
  O extends object = {},
> = ReduxMapStateToProps<S, O, State>

export { connect };
