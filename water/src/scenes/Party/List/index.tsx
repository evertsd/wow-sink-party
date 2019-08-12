import * as React from 'react';
import { PartyListItem } from './Item';
import './styles.css';

const defaultParties = [
  '61472496-4028-4fe3-ad91-4307ca1e0bbe',
  '71961c28-ceaa-4b0f-bb13-aa4249cc7006',
];

export const PartyList = () => (
  <div className="party-list">
    {defaultParties.map((id, i) => <PartyListItem key={i} id={id} />)}
  </div>
);
