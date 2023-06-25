import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../../action/actionType';
import { handleAuthLogin } from '../auth-saga/authLoginSaga';
import {
  handleEditPassword,
  handleEditProfile,
  handleGetAllUser,
  handleGetProfile,
} from '../user-saga/userSaga';
import { handleAuthSignUp } from '../auth-saga/authSignUpSaga';
import {
  handleAddAddress,
  handleDeleteAddress,
  handleGetAddressType,
  handleGetCity,
  handleUpdateAddress,
} from '../user-saga/addressSaga';
import {
  handleAddPhoneNumber,
  handleEditPhoneNumber,
  handleDeletePhoneNumber,
} from '../user-saga/phoneSaga';
import {
  handleAddEmail,
  handleEditEmail,
  handleDeleteEmail,
} from '../user-saga/emailSaga';
import {
  handleAddEducation,
  handleDeleteEducation,
  handleEditEducation,
} from '../user-saga/educationSaga';
import {
  handleAddExperiences,
  handleDeleteExperiences,
  handleEditExperiences,
} from '../user-saga/experiencesSaga';
import {
  handleAddSkills,
  handleDeleteSkills,
  handleGetSkill,
} from '../user-saga/skillsSaga';
import { handleGetRole, handleUpdateRole } from '../user-saga/roleSaga';
import { handleApplyBootcamp, handleApplyJobs } from '../user-saga/applySaga';
import { doGetApplyBootcampResponse } from '../../action/actionReducer';

function* watchAll() {
  yield all([
    // Auth
    takeEvery(ActionTypes.REQ_GET_LOGIN, handleAuthLogin),
    takeEvery(ActionTypes.REQ_GET_SIGNUP, handleAuthSignUp),

    //User
    takeEvery(ActionTypes.REQ_GET_USER, handleGetAllUser),

    //Role
    takeEvery(ActionTypes.REQ_GET_ROLE, handleGetRole),
    takeEvery(ActionTypes.REQ_UPDATE_ROLE, handleUpdateRole),

    //Profile-Setting
    takeEvery(ActionTypes.REQ_GET_PROFILE, handleGetProfile),
    takeEvery(ActionTypes.REQ_UPDATE_PROFILE, handleEditProfile),
    takeEvery(ActionTypes.REQ_UPDATE_PASSWORD, handleEditPassword),

    //Profile-Email
    takeEvery(ActionTypes.REQ_ADD_EMAIL, handleAddEmail),
    takeEvery(ActionTypes.REQ_UPDATE_EMAIL, handleEditEmail),
    takeEvery(ActionTypes.REQ_DELETE_EMAIL, handleDeleteEmail),

    //Phone-Number
    takeEvery(ActionTypes.REQ_ADD_PHONE, handleAddPhoneNumber),
    takeEvery(ActionTypes.REQ_UPDATE_PHONE, handleEditPhoneNumber),
    takeEvery(ActionTypes.REQ_DELETE_PHONE, handleDeletePhoneNumber),

    //Address
    takeEvery(ActionTypes.REQ_GET_ADDRESS_TYPE, handleGetAddressType),
    takeEvery(ActionTypes.REQ_GET_CITY, handleGetCity),
    takeEvery(ActionTypes.REQ_ADD_ADDRESS, handleAddAddress),
    takeEvery(ActionTypes.REQ_UPDATE_ADDRESS, handleUpdateAddress),
    takeEvery(ActionTypes.REQ_DELETE_ADDRESS, handleDeleteAddress),

    //Education
    takeEvery(ActionTypes.REQ_ADD_EDUCATION, handleAddEducation),
    takeEvery(ActionTypes.REQ_UPDATE_EDUCATION, handleEditEducation),
    takeEvery(ActionTypes.REQ_DELETE_EDUCATION, handleDeleteEducation),

    //Experiences
    takeEvery(ActionTypes.REQ_ADD_EXPERIENCES, handleAddExperiences),
    takeEvery(ActionTypes.REQ_UPDATE_EXPERIENCES, handleEditExperiences),
    takeEvery(ActionTypes.REQ_DELETE_EXPERIENCES, handleDeleteExperiences),

    //Skills
    takeEvery(ActionTypes.REQ_GET_SKILL, handleGetSkill),
    takeEvery(ActionTypes.REQ_ADD_SKILL, handleAddSkills),
    takeEvery(ActionTypes.REQ_DELETE_SKILL, handleDeleteSkills),

    //Apply
    takeEvery(ActionTypes.REQ_APPLY_JOB, handleApplyJobs),

    //Apply Bootcamp
    takeEvery(ActionTypes.REQ_APPLY_BOOTCAMP, handleApplyBootcamp),
  ]);
}

export default watchAll;
