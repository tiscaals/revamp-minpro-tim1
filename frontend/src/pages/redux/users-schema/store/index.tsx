import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../saga/index-saga/index';
import authLoginReducers from '../reducer/auth-reducer/authLoginReducer';
import settingReducers from '../reducer/user-reducer/settingReducer';
import { authSignUpReducers } from '../reducer/auth-reducer/authSignUpReducer';
import userReducers from '../reducer/user-reducer/userReducer';
import addressTypeReducers from '../reducer/user-reducer/addressTypeReducer';
import cityReducers from '../reducer/user-reducer/cityReducers';
import skillsReducers from '../reducer/user-reducer/skillsReducers';

const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({
  userReducers,
  settingReducers,
  authLoginReducers,
  authSignUpReducers,
  addressTypeReducers,
  cityReducers,
  skillsReducers,
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
