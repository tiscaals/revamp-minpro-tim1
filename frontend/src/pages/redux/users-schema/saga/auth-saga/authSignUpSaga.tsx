import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/apimethod';
import { doReqSignUpResponse } from '../../action/actionReducer';

export function* handleAuthSignUp(action: any): any {
  try {
    const result = yield call(apiMethod.authSignUp, action.payload);
    yield put(doReqSignUpResponse(result.data));
  } catch (error: any) {
    yield put(doReqSignUpResponse({ message: error.message, status: 400 }));
  }
}
