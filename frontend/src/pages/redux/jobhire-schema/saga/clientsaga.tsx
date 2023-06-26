import { call, put } from 'redux-saga/effects';
import apiMethod from '../../../api/apimethod';
import {
  doResponseAddClient,
  doResponseDeleteClient,
  doResponseGetClient,
  doResponseGetClientById,
  doResponseUpdateClient,
} from '../action/actionReducer';

export function* handleGetAllClient(): any {
  try {
    const result = yield call(apiMethod.findAllClient);
    yield put(doResponseGetClient(result.data));
  } catch (error) {
    yield put(doResponseGetClient({ message: error, status: 400 }));
  }
}

export function* handleGetClientById(action: any): any {
  try {
    const result = yield call(apiMethod.findOneClient, action.payload);
    console.log('clientSaga result', result);
    yield put(doResponseGetClientById(result.data[0]));
  } catch (error) {
    yield put(doResponseGetClientById({ message: error, status: 400 }));
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
