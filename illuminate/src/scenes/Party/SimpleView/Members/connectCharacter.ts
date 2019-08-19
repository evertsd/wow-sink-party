import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Character } from '~/firebase';
import { Action, State } from '~/store/connect';

interface RequiredProps { id: string; }
interface StateProps { character?: Character.Attributes; }
interface DispatchProps { setCharacter: typeof Action.Party.setCharacter; }
export interface CharacterProps extends DispatchProps, RequiredProps, StateProps {}

export const connectCharacter = connect<StateProps, DispatchProps, RequiredProps, State>(
  (state, { id }) => ({ character: state.character[id] }),
  { setCharacter: Action.Party.setCharacter },
);

export const useCharacter = ({ id, character, setCharacter }: CharacterProps) => {
  useEffect(() => {
    if (!(id && character && character.id === id)) {
      getCharacter(id).then(character => {
        if (character) { setCharacter(character); }
      })
    }
  }, [id, character, setCharacter]);
};

const getCharacter = async (id: string) => {
  try {
    return await Character.get(id);
  }
  catch (e) {
    console.error(e);
  }
};
