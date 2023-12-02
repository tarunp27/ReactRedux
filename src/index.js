import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import productReducer from './store/reducers/products';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2  from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers({
  shop: productReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);

let persistor = persistStore(store)


ReactDOM.render(
  <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
