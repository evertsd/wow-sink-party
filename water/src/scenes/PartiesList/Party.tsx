import cx from 'classnames';
import moment from 'moment';
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { DownArrow, UpArrow } from '~/assets/icons';
import { mapTimestampToDate } from '~/firebase';
import { CharacterRow } from './Character';
import { connectParty, useParty, PartyProps } from './connectParty'

interface Props extends PartyProps {
  isOpenByDefault?: boolean;
}

const DATE_FORMAT = 'MMMM Do, HH:mm';

const Base: React.FC<Props> = (props) => {
  const { isOpenByDefault, party } = props;
  const [isOpen, setIsOpen] = React.useState(isOpenByDefault);
  useParty(props);

  console.info('Party, party', party);

  return !party ? null : (
    <div className={cx('parties-list-party', { "members-visible": isOpen })}>
      <h2 className="party-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="party-header-content">
          {party.name}
          {party.modifiedAt && (
            <span className="party-header-subtext">{`${moment(mapTimestampToDate(party.modifiedAt)).format(DATE_FORMAT)}`}</span>
          )}
        </div>
        {isOpen ? <UpArrow /> : <DownArrow />}
      </h2>
      <CSSTransition in={isOpen} timeout={360} classNames="collapsible">
        <ul>
          {party.members.map((character: string, i) => (
            <CharacterRow key={i} id={character} />
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

export const Component = connectParty(Base);
