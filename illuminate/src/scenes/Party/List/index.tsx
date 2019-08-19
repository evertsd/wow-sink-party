import * as React from 'react';
import { PartyListItem } from './Item';
import './styles.css';

const defaultParties = [
  'ec0aa87b-bde5-4c03-9d40-f7b61e4411cc',
];

export const PartyList = () => (
  <div className="party-list">
    {defaultParties.map((id, i) => <PartyListItem key={i} id={id} />)}
  </div>
);
