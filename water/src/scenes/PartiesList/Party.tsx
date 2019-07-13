import cx from 'classnames';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { DownArrow, UpArrow } from '~/assets/icons';
import { Character, Party } from '~/firebase';

interface Props {
  party: Party.Model;
  characters: Character.Attributes[];
  isOpenByDefault?: boolean;
}

export const Component: React.FC<Props> = ({ characters, isOpenByDefault, party }) => {
  const [isOpen, setIsOpen] = React.useState(isOpenByDefault);

  return (
    <div className={cx('parties-list-party', { "members-visible": isOpen })}>
      <h2 className="party-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{party.name}</span>
        {isOpen ? <UpArrow /> : <DownArrow />}
      </h2>
      <CSSTransition in={isOpen} timeout={360} classNames="collapsible">
        <ul>
          {characters.map((character: Character.Attributes, i) => (
            <li key={i} className="party-member" style={{ color: Character.getClassColor(character) }}>
              <div className="party-member-name">
                {character.name}
              </div>
              <div className="party-member-level">
                {character.level}
              </div>
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};
