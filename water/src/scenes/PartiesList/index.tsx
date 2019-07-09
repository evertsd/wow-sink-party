import * as React from 'react';
import { Character } from '~/firebase';
import { PartyService } from '~/services';
import './styles.css';

const useDefaultParty = () => {
  const [state, setState] = React.useState<PartyService.PartyNormalized>();

  React.useEffect(() => {
    PartyService.get('61472496-4028-4fe3-ad91-4307ca1e0bbe')
      .then(setState);
  }, []);

  return state;
};

export const PartiesList = () => {
  const state = useDefaultParty();

  if (!state) {
    return <p>Loading...</p>;
  }

  const characters = state.characters.sort(Character.sortByLevel);
  console.info('characters', characters);
  return (
    <div className="parties-list">
      <h2>{state.party.name}</h2>
      <ul>
        {characters.map((character: Character.Attributes, i) => (
          <li key={i} className="party-member" style={{ color: Character.getClassColor(character) }}>
            <div className="party-member-level">
              {character.level}
            </div>
            <div className="party-member-name">
              {character.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
