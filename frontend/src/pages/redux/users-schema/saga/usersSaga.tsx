import apimethod from '@/pages/api/apimethod';
import { call, put } from 'redux-saga/effects';
import { getUsersRes } from '../action/actionReducer';

function* handleGetUsers(): any {
    try {
      const result = yield call(apimethod.getInstructor);
      yield put(getUsersRes(result.data[0]));
      // console.log("saga", result.data[0]);
    } catch (error) {
      yield put(getUsersRes({ message: error, status: 400 }));
    }
  }

  export {handleGetUsers}
