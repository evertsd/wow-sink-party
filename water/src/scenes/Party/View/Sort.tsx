import * as React from 'react';
import { BodyBuilding, Upload } from '~/assets/icons';

export const PartyHeaderSort = () => (
  <div className="party-sort">
    <div className="party-sort-button">
      <BodyBuilding />
    </div>
    <div className="party-sort-direction">
      <Upload className="arrow-descending" />
    </div>
  </div>
);
