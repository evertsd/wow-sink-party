import * as React from 'react';
import { FilterService, PartyService } from '~/services';
import * as Party from './Party';
import './styles.css';

const defaultParties = [
  '61472496-4028-4fe3-ad91-4307ca1e0bbe',
  '71961c28-ceaa-4b0f-bb13-aa4249cc7006',
];

const getParties = async (ids: string[]) => {
  const parties = await Promise.all(ids.map(PartyService.get));

  return parties.filter(FilterService.notUndefined);
};

const useDefaultParty = () => {
  const [state, setState] = React.useState<PartyService.PartyNormalized[]>([]);

  React.useEffect(() => {
    getParties(defaultParties).then(setState);
  }, []);

  return state;
};

export const PartiesList = () => {
  const parties = useDefaultParty();

  if (!parties) {
    return <p>Loading...</p>;
  }

  return (
    <div className="parties-list">
      {parties.map((party, i) => <Party.Component key={i} {...party} isOpenByDefault={true} />)}
    </div>
  );
};
