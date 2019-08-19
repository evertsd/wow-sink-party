import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Party } from '~/firebase';
import { Action, State } from '~/store/connect';

interface RequiredProps { id: string; }
interface StateProps { party?: Timestamped<Party.Model>; }
interface DispatchProps { setParty: typeof Action.Party.set; }
export interface PartyProps extends DispatchProps, RequiredProps, StateProps {}

export const connectParty = connect<StateProps, DispatchProps, RequiredProps, State>(
  (state, { id }) => ({ party: state.party[id] }),
  { setParty: Action.Party.set },
);

export const useParty = (props: PartyProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldGetParty(props)) {
      setIsLoading(true);

      getParty(props).finally(() => setIsLoading(false));
    }
  }, [props.id]);

  return isLoading;
};

const shouldGetParty = ({ id, party }: PartyProps) => {
  if (!(id && party && (party.id === id))) { return true; }

  const hoursSinceUpdate = party.setAt ?
    dayjs().diff(party.setAt, 'h', true) :
    Number.MAX_SAFE_INTEGER;

  return hoursSinceUpdate > 1;
};

const getParty = async ({ id, setParty }: PartyProps) => {
  try {
    const response = await Party.get(id);

    setParty(response);
  } catch (e) {
    console.error(e);
  }
}
