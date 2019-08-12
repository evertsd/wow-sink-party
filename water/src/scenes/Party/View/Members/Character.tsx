import moment from 'moment';
import * as React from 'react';
import { Character } from '~/firebase';
import { connectCharacter, useCharacter, CharacterProps } from './connectCharacter';

const DATE_FORMAT = 'MMMM Do, HH:mm';

export const Component: React.FC<CharacterProps> = (props) => {
  const { character } = props;
  useCharacter(props);

  return !character ? null : (
    <li className="party-member" style={{ color: Character.getClassColor(character) }}>
      <div className="party-member-name">
        {character.name}
        {character.lastLoginTimestamp && (
          <span className="party-member-subtext">
            Last log in: {`${moment(character.lastLoginTimestamp).format(DATE_FORMAT)}`}
          </span>
        )}
      </div>
      <div className="party-member-level">
        {character.level}
      </div>
    </li>
  );
};

export const CharacterRow = connectCharacter(Component);
