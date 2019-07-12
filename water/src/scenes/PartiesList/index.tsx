import * as React from 'react';
import { PartyService } from '~/services';
import * as Party from './Party';
import './styles.css';

const useDefaultParty = () => {
  const [state, setState] = React.useState<PartyService.PartyNormalized>();

  React.useEffect(() => {
    PartyService.get('61472496-4028-4fe3-ad91-4307ca1e0bbe')
      .then(setState);
  }, []);

  return state;
};

export const PartiesList = () => {
  const state = useDefaultParty();

  if (!state) {
    return <p>Loading...</p>;
  }

  return (
    <div className="parties-list">
      <Party.Component {...state} isOpenByDefault={true} />
    </div>
  );
};
