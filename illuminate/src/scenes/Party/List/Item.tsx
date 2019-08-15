import dayjs from 'dayjs';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { mapTimestampToDate } from '~/firebase';
import { connectParty, useParty, PartyProps } from './connectParty'

const DATE_FORMAT = 'MMMM DD, HH:mm';

const Component: React.FC<PartyProps> = (props) => {
  const { party } = props;
  useParty(props);

  return !party ? null : (
    <div className="party-list-item">
      <Link to={`/party/${props.id}`} className="party-header">
        <div className="party-header-content">
          {party.name}
          {party.modifiedAt && (
            <span className="party-header-subtext">{`${dayjs(mapTimestampToDate(party.modifiedAt)).format(DATE_FORMAT)}`}</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export const PartyListItem = connectParty(Component);
