import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import {
  doResponseAddJobPost,
  doResponseDeleteJobPost,
  doResponseGetCurnumber,
  doResponseGetJobPost,
  doResponseUpdateJobPost,
} from "../action/actionreducer";

export function* handleGetAllJobPost(): any {
  try {
    const result = yield call(apiMethod.findAllJob);
    yield put(doResponseGetJobPost(result.data.result[0]));
  } catch (error) {
    yield put(doResponseGetJobPost({ message: error, status: 400 }));
  }
}


export function* handleGetCurnumber(): any {
  try {
    const result = yield call(apiMethod.findCurrentNumber);
    // console.log('saga',result.data)
    yield put(doResponseGetCurnumber(result.data));
  } catch (error) {
    yield put(doResponseGetCurnumber({ message: error, status: 400 }));
  }
}


export function* handleAddJobPost(action: any): any {
  try {
    const result = yield call(apiMethod.createJobPost, action.payload);
    yield put(doResponseAddJobPost(result.data));
  } catch (error) {
    yield put(doResponseAddJobPost({ message: error, status: 400 }));
  }
}

export function* handleUpdateJobPost(action: any): any {
  try {
    const result = yield call(apiMethod.updateJobPost, action.payload);
    yield put(doResponseUpdateJobPost(result.data));
  } catch (error) {
    yield put(doResponseUpdateJobPost({ message: error, status: 400 }));
  }
}

export function* handleDeleteJobPost(action: any): any {
  try {
    const result = yield call(apiMethod.deleteJobPost, action.payload);
    console.log(result);
    yield put(doResponseDeleteJobPost(result.data));
  } catch (error) {
    yield put(doResponseDeleteJobPost({ message: error, status: 400 }));
  }
}
