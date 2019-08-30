import * as React from 'react';
import { PartyListItem } from './Item';
import './styles.css';

const defaultParties = [
  'ec0aa87b-bde5-4c03-9d40-f7b61e4411cc',
  'b05cc096-2f8b-41c0-8a41-a31104512e66',
];

export const PartyList = () => (
  <div className="party-list">
    {defaultParties.map((id, i) => <PartyListItem key={i} id={id} />)}
  </div>
);
