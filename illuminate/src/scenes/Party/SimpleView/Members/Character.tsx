import dayjs from 'dayjs';
import * as React from 'react';
import { Character, mapTimestampToDate } from '~/firebase';
import { capitalize } from '~/services/format';
import { connectCharacter, useCharacter, CharacterProps } from './connectCharacter';

const DATE_FORMAT = 'MMMM DD, HH:mm';

export const Component: React.FC<CharacterProps> = (props) => {
  const { character } = props;
  useCharacter(props);

  if (!character) { return null; }

  return (
    <li className="party-member" style={{ color: Character.getClassColor(character) }}>
      <div className="party-member-name">
        {capitalize(character.name)}
        {character.modifiedAt && (
          <span className="party-member-subtext">
            Last updated:
            {`${dayjs(mapTimestampToDate(character.modifiedAt)).format(DATE_FORMAT)}`}
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
