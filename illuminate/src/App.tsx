import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Anon';
import { connectStore } from './store/connect/Component';
import './assets/styles/global.css';

const App: React.FC = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default connectStore(App);
