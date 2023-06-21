import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import { doResponseGetRoac } from "../action/actionReducer";


export function* handleGetRoac(): any {
    try {
      const result = yield call(apiMethod.findRouteaction);
      console.log('roacSaga',result.data)
      yield put(doResponseGetRoac(result.data));
    } catch (error) {
      yield put(doResponseGetRoac({ message: error, status: 400 }));
    }
  }