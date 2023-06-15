import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import { doResponseGetEmprange } from "../action/actionreducer";

export function* handleGetEmprange(): any {
    try {
      const result = yield call(apiMethod.findAllEmprange);
    //   console.log('sa',result.data)
      yield put(doResponseGetEmprange(result.data));
    } catch (error) {
      yield put(doResponseGetEmprange({ message: error, status: 400 }));
    }
  }