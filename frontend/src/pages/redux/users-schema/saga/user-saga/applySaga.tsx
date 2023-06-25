import { call, put } from 'redux-saga/effects';
import {
  doGetApplyBootcampResponse,
  doGetApplyJobResponse,
} from '../../action/actionReducer';
import apiMethod from '@/pages/api/user-api/apimethod';

export function* handleApplyJobs(action: any): any {
  try {
    const result = yield call(apiMethod.applyJobs, action.payload);
    yield put(doGetApplyJobResponse(result.data));
  } catch (error: any) {
    yield put(doGetApplyJobResponse({ message: error.message, status: 400 }));
  }
}

export function* handleApplyBootcamp(action: any): any {
  try {
    const result = yield call(apiMethod.applyBootcamp, action.payload);
    yield put(doGetApplyBootcampResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetApplyBootcampResponse({ message: error.message, status: 400 })
    );
  }
}
