import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../action/actionType';
import { handleAuthLogin } from './authLoginSaga';
import { handleGetAllUser } from './userSaga';
import { handleAuthSignUp } from './authSignUpSaga';

function* watchAll() {
  yield all([
    // Auth
    takeEvery(ActionTypes.REQ_GET_LOGIN, handleAuthLogin),
    takeEvery(ActionTypes.REQ_GET_SIGNUP, handleAuthSignUp),
    //User
    takeEvery(ActionTypes.REQ_GET_USER, handleGetAllUser),
  ]);
}

export default watchAll;
