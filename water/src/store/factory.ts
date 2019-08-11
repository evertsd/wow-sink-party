import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer } from './reducers';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, reducer);

export const create = () => {
  let middleware = applyMiddleware();

  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(persistedReducer, middleware);

  return { store, persistor: persistStore(store) };
};
