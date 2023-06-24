import { call, put } from 'redux-saga/effects';
import { doGetApplyJobResponse } from '../../action/actionReducer';
import apiMethod from '@/pages/api/user-api/apimethod';

export function* handleApplyJobs(action: any): any {
  try {
    const result = yield call(apiMethod.applyJobs, action.payload);
    yield put(doGetApplyJobResponse(result.data));
  } catch (error: any) {
    yield put(doGetApplyJobResponse({ message: error.message, status: 400 }));
  }
}
