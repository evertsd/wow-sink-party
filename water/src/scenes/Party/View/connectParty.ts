import dayjs from 'dayjs';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { lambda } from '~/backend';
import { Party } from '~/firebase';
import { Action, State } from '~/store/connect';

interface RequiredProps { id: string; }
interface StateProps { party?: Timestamped<Party.Model>; }
interface DispatchProps {
  setParty: typeof Action.Party.set;
  setCharacter: typeof Action.Party.setCharacter;
}
export interface PartyProps extends DispatchProps, RequiredProps, StateProps {}

export const connectParty = connect<StateProps, DispatchProps, RequiredProps, State>(
  (state, { id }) => ({ party: state.party[id] }),
  { setParty: Action.Party.set, setCharacter: Action.Party.setCharacter },
);

export const useParty = (props: PartyProps) =>
  useEffect(() => { shouldGetParty(props) && getParty(props) }, [props.id]);

const shouldGetParty = ({ id, party }: PartyProps) => {
  if (!(id && party && party.id === id)) { return true; }

  const hoursSinceUpdate = dayjs().diff(party.setAt, 'h', true);

  return hoursSinceUpdate > 1;
};

const getParty = async ({ id, setCharacter, setParty }: PartyProps) => {
  try {
    const response = await lambda.getParty(id);

    setParty(response.party);
    response.characters.forEach(character => setCharacter(character));
  } catch (e) {
    console.error(e);
  }
}
