import { call, put } from "redux-saga/effects";
import apiMethod from "../../../api/apimethod";
import {
  doResponseAddClient,
  doResponseDeleteClient,
  doResponseGetClient,
  doResponseUpdateClient,
} from "../action/actionreducer";

export function* handleGetAllClient(): any {
  try {
    const result = yield call(apiMethod.findAllClient);
    yield put(doResponseGetClient(result.data));
  } catch (error) {
    yield put(doResponseGetClient({ message: error, status: 400 }));
  }
}

export function* handleAddClient(action: any): any {
  try {
    const result = yield call(apiMethod.createClient, action.payload);
    yield put(doResponseAddClient(result.data));
  } catch (error) {
    yield put(doResponseAddClient({ message: error, status: 400 }));
  }
}

export function* handleUpdateClient(action: any): any {
  try {
    const result = yield call(apiMethod.updateClient, action.payload);
    yield put(doResponseUpdateClient(result.data));
  } catch (error) {
    yield put(doResponseUpdateClient({ message: error, status: 400 }));
  }
}

export function* handleDeleteClient(action: any): any {
  try {
    const result = yield call(apiMethod.deleteClient, action.payload);
    console.log(result);
    yield put(doResponseDeleteClient(result.data));
  } catch (error) {
    yield put(doResponseDeleteClient({ message: error, status: 400 }));
  }
}


