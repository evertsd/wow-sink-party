import dayjs from 'dayjs';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Character } from '~/firebase';
import { Action, State } from '~/store/connect';

interface RequiredProps { id: string; }
interface StateProps { character?: Timestamped<Character.Attributes>; }
interface DispatchProps { setCharacter: typeof Action.Party.setCharacter; }
export interface CharacterProps extends DispatchProps, RequiredProps, StateProps {}

export const connectCharacter = connect<StateProps, DispatchProps, RequiredProps, State>(
  (state, { id }) => ({ character: state.character[id] }),
  { setCharacter: Action.Party.setCharacter },
);

export const useCharacter = ({ id, character, setCharacter }: CharacterProps) =>
  useEffect(
    () => { getCharacter({ id, character, setCharacter }); },
    [id, character, setCharacter],
  );

const getCharacter = async (props: CharacterProps) => {
  if (!shouldGetCharacter(props)) { return; }

  try {
    const character = await Character.get(props.id);

    props.setCharacter(character);
  }
  catch (e) {
    console.error(e);
  }
};

const shouldGetCharacter = ({ id, character }: CharacterProps) => {
  if (!(id && character && (character.id === id))) { return true; }

  const hoursSinceUpdate = character.setAt ?
    dayjs().diff(character.setAt, 'h', true) :
    Number.MAX_SAFE_INTEGER;

  return hoursSinceUpdate > 0.25;
};
