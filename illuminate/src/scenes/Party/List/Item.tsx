import * as React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '~/services/format';
import { connectParty, useParty, PartyProps } from './connectParty'

const Component: React.FC<PartyProps> = (props) => {
  const { party } = props;
  useParty(props);

  return !party ? null : (
    <div className="party-list-item">
      <Link to={`/party/${props.id}`} className="party-header">
        <div className="party-header-content">
          {party.name}
          <span className="party-header-subtext">{capitalize(party.realm)}</span>
        </div>
      </Link>
    </div>
  );
};

export const PartyListItem = connectParty(Component);
