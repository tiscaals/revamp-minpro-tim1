import { call, put } from 'redux-saga/effects';
import apiMethod from '../../api/apimethod';
import { doGetUserResponse } from '../action/actionReducer';

export function* handleGetAllUser(): any {
  try {
    const result = yield call(apiMethod.getAllUsers);
    yield put(doGetUserResponse(result.data.result));
  } catch (error: any) {
    yield put(doGetUserResponse({ message: error, status: 400 }));
  }
}
