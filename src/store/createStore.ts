import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { configureStore, getDefaultMiddleware, Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { IApplicationState } from './types';
import { reducers } from '.';
import { sagas } from './sagas';

function* rootSaga() {
  yield all(sagas);
}

function rootReducer() {
  return combineReducers({ ...reducers });
}

// TODO add state as needed, can remove if not needed
const preloadedState: IApplicationState = {} as IApplicationState;

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware: Middleware[] = [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ];

  const store = configureStore({
    reducer: rootReducer(),
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
