import dayjs from 'dayjs';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { LoadingBar } from '~/components';
import { ViewMembers } from './Members';
import { connectParty, useParty, PartyProps } from './connectParty'
import './styles.css';

export { ClosePartyView } from './Close';

const DATE_FORMAT = 'MMMM DD, HH:mm';

const Component: React.FC<PartyProps> = (props) => {
  const { party } = props;
  const isLoading = useParty(props);

  return !party ? null : (
    <div className="party-view">
      <h2 className="party-header">
        {isLoading && <LoadingBar />}
        <div className="party-header-content">
          {party.name}
          {party.setAt && (
            <span className="party-header-subtext">
              Last loaded: {`${dayjs(party.setAt).format(DATE_FORMAT)}`}
            </span>
          )}
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
