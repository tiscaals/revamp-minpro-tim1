import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/user-api/apimethod';
import {
  doGetAddEducationResponse,
  doGetDeleteEducationResponse,
  doGetUpdateEducationResponse,
} from '../../action/actionReducer';

// Saga Profile Education
export function* handleAddEducation(action: any): any {
  try {
    const result = yield call(apiMethod.addEducation, action.payload);
    yield put(doGetAddEducationResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetAddEducationResponse({ message: error.message, status: 400 })
    );
  }
}

export function* handleEditEducation(action: any): any {
  try {
    const result = yield call(apiMethod.updateEducation, action.payload);
    yield put(doGetUpdateEducationResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetUpdateEducationResponse({ message: error.message, status: 400 })
    );
  }
}

export function* handleDeleteEducation(action: any): any {
  try {
    const result = yield call(apiMethod.removeEducation, action.payload);
    yield put(doGetDeleteEducationResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetDeleteEducationResponse({ message: error.message, status: 400 })
    );
  }
}
