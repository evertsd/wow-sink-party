import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { create } from '../factory';

export const connectStore = (Component: React.FC): React.FC => {
  const { persistor, store } = create();

  return (props) => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
};
