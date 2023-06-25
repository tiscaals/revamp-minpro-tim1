import { createLogger } from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import { combineReducers } from 'redux';
import hrReducers from '../hr-schema/reducer/hrReducer';
import empReducers from '../hr-schema/reducer/empReducer';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from '../sagaGlobal';

const logger = createLogger();
const saga = createSagaMiddleware();
const reducer = combineReducers({
  hrReducers,
  empReducers,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga);
export default store;
