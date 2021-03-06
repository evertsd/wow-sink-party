import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Party } from '~/firebase';
import { Action, State } from '~/store/connect';
import * as tome from '~/tome';

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

export const useParty = (props: PartyProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldGetParty(props)) {
      setIsLoading(true);

      getParty(props).finally(() => setIsLoading(false));
    }
  }, [props.id, props.party]);

  return isLoading;
};

const shouldGetParty = ({ id, party }: PartyProps) => {
  if (!(id && party && (party.id === id))) { return true; }

  const hoursSinceUpdate = party.setAt ?
    dayjs().diff(party.setAt, 'h', true) :
    Number.MAX_SAFE_INTEGER;

  return hoursSinceUpdate > 1;
};

const getParty = async ({ id, setCharacter, setParty }: PartyProps) => {
  try {
    const response = await tome.getParty(id);

    setParty(response.party);
    response.characters.forEach(character => setCharacter(character));
  } catch (e) {
    console.error(e);
  }
}
