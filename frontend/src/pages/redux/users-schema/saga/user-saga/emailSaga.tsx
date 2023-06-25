import { call, put } from 'redux-saga/effects';
import {
  doGetAddEmailResponse,
  doGetUpdateEmailResponse,
  doGetDeleteEmailResponse,
} from '../../action/actionReducer';
import apiMethod from '@/pages/api/user-api/apimethod';

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
