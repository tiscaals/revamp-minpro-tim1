import apimethod from '@/pages/api/apimethod';
import { call, put } from 'redux-saga/effects';
import {
  doGetUsersAccountResponse,
  doAddAccountResponse,
  doUsersAccountUpdateResponse,
  deleteUsersAccountResponse
} from '../action/actionReducer';

function* handlegetAllUsersAccount(): any {
  // console.log("wadwa");
  try {
    const result = yield call(apimethod.findAllUsersAccount);
    yield put(doGetUsersAccountResponse(result.data));
  } catch (error) {
    yield put(doGetUsersAccountResponse({ message: error, status: 400 }));
  }
}

function* handleaddUserAccount(action:any): any {
  try {
    const result = yield call(apimethod.createAccount,action.payload);
    yield put(doAddAccountResponse(result.data));
  } catch (error) {
    yield put(doAddAccountResponse({ message: error, status: 400 }));
  }
}

function* handleUpdateUsersAccount(action: any): any {
  // console.log("acti1on");
  try {
    const result = yield call(apimethod.updateUsersAccount, action.payload);
    yield put(doUsersAccountUpdateResponse(result.data));
    // console.log(result.data);
  } catch (error) {
    yield put(doUsersAccountUpdateResponse({ message: error, status: 400 }));
  }
}

function* handleDeleteUsersAccount(action: any): any {
  try {
    // console.log(action.payload);
    const result = yield call(apimethod.deleteUsersAccount, action.payload);
    yield put(deleteUsersAccountResponse(result.data));
  } catch (error) {
    yield put(deleteUsersAccountResponse({ message: error, status: 400 }));
  }
}


export { handlegetAllUsersAccount, handleaddUserAccount,handleUpdateUsersAccount,handleDeleteUsersAccount };