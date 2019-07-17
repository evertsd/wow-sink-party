import cx from 'classnames';
import moment from 'moment';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { DownArrow, UpArrow } from '~/assets/icons';
import { Character, Party } from '~/firebase';

interface Props {
  party: Party.Model;
  characters: Character.Attributes[];
  isOpenByDefault?: boolean;
}

const DATE_FORMAT = 'MMMM Do YYYY, HH:mm';

export const Component: React.FC<Props> = ({ characters, isOpenByDefault, party }) => {
  const [isOpen, setIsOpen] = React.useState(isOpenByDefault);
  console.info('Party', party);

  return (
    <div className={cx('parties-list-party', { "members-visible": isOpen })}>
      <h2 className="party-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="party-header-content">
          {party.name}
          {party.modifiedAt && (
            <span className="party-header-subtext">{`${moment(party.modifiedAt.toDate()).format(DATE_FORMAT)}`}</span>
          )}
        </div>
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
