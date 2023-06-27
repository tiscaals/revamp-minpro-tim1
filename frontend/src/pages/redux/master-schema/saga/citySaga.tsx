import { call, put } from 'redux-saga/effects';
import apiMethod from '../../../api/apimethod';
import { doResponseGetCity, doResponseGetJobrole } from '../action/actionReducer';

export function* handleGetCity(): any {
  try {
    const result = yield call(apiMethod.getCity);
    yield put(doResponseGetCity(result.data));
  } catch (error: any) {
    yield put(doResponseGetCity({ message: error, status: 400 }));
  }
}