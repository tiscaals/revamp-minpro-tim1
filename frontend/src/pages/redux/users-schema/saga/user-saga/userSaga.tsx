import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/user-api/apimethod';
import {
  doGetAddEmailResponse,
  doGetAddPhoneNumberResponse,
  doGetDeleteEmailResponse,
  doGetDeletePhoneResponse,
  doGetProfileResponse,
  doGetUpdateEmailResponse,
  doGetUpdatePasswordResponse,
  doGetUpdatePhoneNumberResponse,
  doGetUpdateProfileResponse,
  doGetUserResponse,
} from '../../action/actionReducer';

export function* handleGetAllUser(): any {
  try {
    const result = yield call(apiMethod.getAllUsers);
    yield put(doGetUserResponse(result.data.result));
  } catch (error: any) {
    yield put(doGetUserResponse({ message: error, status: 400 }));
  }
}

// Saga Profile
export function* handleGetProfile(action: any): any {
  try {
    const result = yield call(apiMethod.getUsersById, action.payload);
    yield put(doGetProfileResponse(result.data));
  } catch (error: any) {
    yield put(doGetProfileResponse({ message: error, status: 400 }));
  }
}

export function* handleEditProfile(action: any): any {
  try {
    const result = yield call(apiMethod.updateProfile, action.payload);
    yield put(doGetUpdateProfileResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetUpdateProfileResponse({ message: error.message, status: 400 })
    );
  }
}

// Saga Edit Password
export function* handleEditPassword(action: any): any {
  try {
    const result = yield call(apiMethod.updatePassword, action.payload);
    yield put(doGetUpdatePasswordResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetUpdatePasswordResponse({ message: error.message, status: 400 })
    );
  }
}

// Saga Profile Email
export function* handleAddEmail(action: any): any {
  try {
    const result = yield call(apiMethod.addEmail, action.payload);
    yield put(doGetAddEmailResponse(result.data));
  } catch (error: any) {
    yield put(doGetAddEmailResponse({ message: error.message, status: 400 }));
  }
}

export function* handleEditEmail(action: any): any {
  try {
    const result = yield call(apiMethod.updateEmail, action.payload);
    yield put(doGetUpdateEmailResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetUpdateEmailResponse({ message: error.message, status: 400 })
    );
  }
}

export function* handleDeleteEmail(action: any): any {
  try {
    const result = yield call(apiMethod.removeEmail, action.payload);
    yield put(doGetDeleteEmailResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetDeleteEmailResponse({ message: error.message, status: 400 })
    );
  }
}

// Saga Profile Phone Number
export function* handleAddPhoneNumber(action: any): any {
  try {
    const result = yield call(apiMethod.addPhoneNumber, action.payload);
    yield put(doGetAddPhoneNumberResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetAddPhoneNumberResponse({ message: error.message, status: 400 })
    );
  }
}

export function* handleEditPhoneNumber(action: any): any {
  try {
    const result = yield call(apiMethod.updatePhoneNumber, action.payload);
    yield put(doGetUpdatePhoneNumberResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetUpdatePhoneNumberResponse({ message: error.message, status: 400 })
    );
  }
}

export function* handleDeletePhoneNumber(action: any): any {
  try {
    const result = yield call(apiMethod.removePhoneNumber, action.payload);
    yield put(doGetDeletePhoneResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetDeletePhoneResponse({ message: error.message, status: 400 })
    );
  }
}
