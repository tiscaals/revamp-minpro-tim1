import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import { doResponseGetWorktype } from "../action/actionReducer";


export function* handleGetWorktype(): any {
    try {
      const result = yield call(apiMethod.findWorktype);
      yield put(doResponseGetWorktype(result.data));
    } catch (error) {
      yield put(doResponseGetWorktype({ message: error, status: 400 }));
    }
  }