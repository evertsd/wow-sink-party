import { State } from '../schema';

export type Selector<J> = (state: State, ...args: any[]) => J;
