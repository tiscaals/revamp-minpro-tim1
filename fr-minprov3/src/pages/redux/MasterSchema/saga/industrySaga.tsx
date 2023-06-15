import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import { doResponseGetIndustry } from "../action/actionReducer";


export function* handleGetIndustry(): any {
    try {
      const result = yield call(apiMethod.findIndustry);
      yield put(doResponseGetIndustry(result.data));
    } catch (error) {
      yield put(doResponseGetIndustry({ message: error, status: 400 }));
    }
  }