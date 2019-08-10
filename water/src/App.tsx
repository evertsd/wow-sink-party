import React from 'react';
import { PartiesList } from './scenes/PartiesList';
import { connectStore } from './store/connect/Component';
import './assets/styles/global.css';

const App: React.FC = () => (
  <PartiesList />
);

export default connectStore(App);
