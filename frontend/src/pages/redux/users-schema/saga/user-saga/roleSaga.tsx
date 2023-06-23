import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/user-api/apimethod';
import {
  doGetRoleResponse,
  doGetUpdateRoleResponse,
} from '../../action/actionReducer';

//Saga Get Role And Update Role
export function* handleGetRole(): any {
  try {
    const result = yield call(apiMethod.getRole);
    yield put(doGetRoleResponse(result.data.result));
  } catch (error: any) {
    yield put(doGetRoleResponse({ message: error, status: 400 }));
  }
}

export function* handleUpdateRole(action: any): any {
  try {
    const result = yield call(apiMethod.updateRole, action.payload);
    yield put(doGetUpdateRoleResponse(result.data));
  } catch (error: any) {
    yield put(doGetUpdateRoleResponse({ message: error.message, status: 400 }));
  }
}
