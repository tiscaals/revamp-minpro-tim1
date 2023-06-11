import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/apimethod';
import Cookies from 'js-cookie';
import { doReqLoginResponse } from '../action/actionReducer';

export function* handleAuthLogin(action: any): any {
  try {
    const result = yield call(apiMethod.authLogin, action.payload);
    if (result.data.token) {
      Cookies.set('access_token', result.data.token);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          user_entity_id: result.data.result.user_entity_id,
          user_name: result.data.result.user_name,
        })
      );

      yield put(doReqLoginResponse(result.data));
    } else {
      yield put(
        doReqLoginResponse({
          token: '',
          message: result.data.message,
          status: result.data.status,
        })
      );
    }
  } catch (error: any) {
    yield put(doReqLoginResponse({ message: error.message, status: 400 }));
  }
}
