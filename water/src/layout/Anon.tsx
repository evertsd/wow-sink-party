import * as React from 'react';
import { Navbar } from '~/components';
import { paths } from '~/paths';
import * as Navigation from './Navigation';

const createScenes = () => ([
  Navigation.Party.scene,
]);

const Actions = Navigation.createActions(createScenes);
const Routes = Navigation.createRoutes(createScenes, paths.PARTY);

export const Layout: React.FC = () => (
  <div className="layout">
    <Navbar>
      <Actions />
    </Navbar>
    <Routes />
  </div>
);
