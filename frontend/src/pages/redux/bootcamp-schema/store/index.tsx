import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../saga/index';
import batchReducers from '../reducer/batchReducer';
import trainerReducers from '../reducer/trainerReducer';
import programReducers from '../reducer/programReducer';

const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({
  batchReducers,
  trainerReducers,
  programReducers
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga);

export default store;
