import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import {
  doResponseGetCandidate,
} from "../action/actionReducer";

export function* handleGetProCandidate(): any {
  try {
    const result = yield call(apiMethod.findProCandidate);
    console.log("talentSaga", result.data);
    yield put(doResponseGetCandidate(result.data));
  } catch (error) {
    yield put(doResponseGetCandidate({ message: error, status: 400 }));
  }
}
