import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/apimethod';
import {
  doGetProfileResponse,
  doGetUpdatePasswordResponse,
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
