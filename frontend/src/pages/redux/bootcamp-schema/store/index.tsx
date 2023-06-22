import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../saga/index';
import batchReducers from '../reducer/batchReducer';
import trainerReducers from '../reducer/trainerReducer';
import programReducers from '../reducer/programReducer';
import talentsReducers from '../reducer/talentsReducer';
import studentReducers from '../reducer/studentsReducer';
import routeReducers from '../reducer/routeReducer';
import candidateReducers from '../reducer/candidateReducer';
import traineeReducers from '../reducer/traineeReducer';
import evalReducers from '../reducer/evaluationReducer';

const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({
  batchReducers,
  trainerReducers,
  programReducers,
  talentsReducers,
  studentReducers,
  routeReducers,
  candidateReducers,
  traineeReducers,
  evalReducers,
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
