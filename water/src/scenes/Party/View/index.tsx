import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ViewMembers } from './Members';
import { connectParty, useParty, PartyProps } from '../components/connectParty'
import './styles.css';

export { ClosePartyView } from './Close';

const Component: React.FC<PartyProps> = (props) => {
  const { party } = props;
  useParty(props);

  return !party ? null : (
    <div className="party-view">
      <h2 className="party-header">
        <div className="party-header-content">
          {party.name}
        </div>
      </h2>
      <ViewMembers party={party} />
    </div>
  );
};

const View = connectParty(Component);

type RouteProps = RouteComponentProps<{ id: string; }>;

export const PartyView: React.FC<RouteProps> = ({ match }) =>
  <View id={match.params.id} />;
