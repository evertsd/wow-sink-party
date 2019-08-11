import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Party } from '~/firebase';
import { Action, State } from '~/store/connect';

interface RequiredProps { id: string; }
interface StateProps { party?: Party.Model; }
interface DispatchProps { setParty: typeof Action.Party.set; }
export interface PartyProps extends DispatchProps, RequiredProps, StateProps {}

export const connectParty = connect<StateProps, DispatchProps, RequiredProps, State>(
  (state, { id }) => ({ party: state.party[id] }),
  { setParty: Action.Party.set },
);

export const useParty = ({ id, party, setParty }: PartyProps) =>
  useEffect(() => {
    if (!(id && party && party.id === id)) {
      Party.get(id).then(setParty);
    }
  }, [id]);
