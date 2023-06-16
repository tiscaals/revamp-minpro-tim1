import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/user-api/apimethod';
import {
  doGetAddPhoneNumberResponse,
  doGetUpdatePhoneNumberResponse,
  doGetDeletePhoneResponse,
} from '../../action/actionReducer';

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
