import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../action/actionType';
import { handleAuthLogin } from './auth-saga/authLoginSaga';
import {
  handleAddEmail,
  handleDeleteEmail,
  handleEditEmail,
  handleEditPassword,
  handleEditProfile,
  handleGetAllUser,
  handleGetProfile,
} from './user-saga/userSaga';
import { handleAuthSignUp } from './auth-saga/authSignUpSaga';

function* watchAll() {
  yield all([
    // Auth
    takeEvery(ActionTypes.REQ_GET_LOGIN, handleAuthLogin),
    takeEvery(ActionTypes.REQ_GET_SIGNUP, handleAuthSignUp),

    //User
    takeEvery(ActionTypes.REQ_GET_USER, handleGetAllUser),

    //Profile-Setting
    takeEvery(ActionTypes.REQ_GET_PROFILE, handleGetProfile),
    takeEvery(ActionTypes.REQ_UPDATE_PROFILE, handleEditProfile),
    takeEvery(ActionTypes.REQ_UPDATE_PASSWORD, handleEditPassword),

    //Profile-Email
    takeEvery(ActionTypes.REQ_ADD_EMAIL, handleAddEmail),
    takeEvery(ActionTypes.REQ_UPDATE_EMAIL, handleEditEmail),
    takeEvery(ActionTypes.REQ_DELETE_EMAIL, handleDeleteEmail),
  ]);
}

export default watchAll;
