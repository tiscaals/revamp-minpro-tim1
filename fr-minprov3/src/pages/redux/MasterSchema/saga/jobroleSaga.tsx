import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import { doResponseGetJobrole } from "../action/actionReducer";


export function* handleGetJobrole(): any {
    try {
      const result = yield call(apiMethod.findJobrole);
      yield put(doResponseGetJobrole(result.data));
    } catch (error) {
      yield put(doResponseGetJobrole({ message: error, status: 400 }));
    }
  }