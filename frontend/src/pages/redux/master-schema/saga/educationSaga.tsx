import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import { doResponseGetEducation } from "../action/actionReducer";

export function* handleGetEducation(): any {
    try {
      const result = yield call(apiMethod.findEducation);
    //   console.log('sa',result.data)
      yield put(doResponseGetEducation(result.data));
    } catch (error) {
      yield put(doResponseGetEducation({ message: error, status: 400 }));
    }
  }