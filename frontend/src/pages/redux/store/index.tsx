import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../saga/index';
import authLoginReducers from '../reducer/authLoginReducer';
import userReducers from '../reducer/userReducer';
import { authSignUpReducers } from '../reducer/authSignUpReducer';

const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({
  userReducers,
  authLoginReducers,
  authSignUpReducers,
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
