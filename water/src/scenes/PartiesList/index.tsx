import * as React from 'react';
// import { FilterService, PartyService } from '~/services';
import * as Party from './Party';
import './styles.css';

const defaultParties = [
  '61472496-4028-4fe3-ad91-4307ca1e0bbe',
  '71961c28-ceaa-4b0f-bb13-aa4249cc7006',
];

export const PartiesList = () => (
  <div className="parties-list">
    {defaultParties.map((id, i) => <Party.Component key={i} id={id} isOpenByDefault={true} />)}
  </div>
);
