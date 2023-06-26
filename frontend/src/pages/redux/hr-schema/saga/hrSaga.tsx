import { call, put } from 'redux-saga/effects';
import apimethod from '../apiMethod';
import {
  getAMresponse,
  getclientresponse,
  getplacementresponse,
  gettalentsempres,
  gettalentsjobresponse,
  gettalentsresponse,
  getujotyresponse,
} from '../action/actionReducer';

function* handleGetEmployee(): any {
  try {
    const result = yield call(apimethod.viewEmployee);
    yield put(getplacementresponse(result.data.result[0]));
  } catch (error) {
    yield put(getplacementresponse({ message: error, status: 400 }));
  }
}

function* handleGetTalents(): any {
  try {
    const result = yield call(apimethod.viewTalents);
    yield put(gettalentsresponse(result.data.result[0]));
  } catch (error) {
    yield put(gettalentsresponse({ message: error, status: 400 }));
  }
}



function* handleSearchClient(): any {
  try {
    const result = yield call(apimethod.searchClient);
    yield put(getclientresponse(result.data.result[0]));
  } catch (error) {
    yield put(getclientresponse({ message: error, status: 400 }));
  }
}

function* handleTalentsEmployee(action: any): any {
  try {
    const result = yield call(apimethod.createEmployeeTalents, action.payload);
    console.log('ini gess', result);
    yield put(gettalentsempres(result.data.result[0]));
  } catch (error) {
    yield put(gettalentsempres({ message: error, status: 400 }));
  }
}

function* handleJobType(): any {
  try {
    const result = yield call(apimethod.jobType);
    yield put(getujotyresponse(result.data.result[0]));
  } catch (error) {
    yield put(getujotyresponse({ message: error, status: 400 }));
  }
}

function* handleAccountManager(): any {
  try {
    const result = yield call(apimethod.accountManager);
    yield put(getAMresponse(result.data.result[0]));
  } catch (error) {
    yield put(getAMresponse({ message: error, status: 400 }));
  }
}

export {
  handleGetEmployee,
  handleGetTalents,
  handleSearchClient,
  handleTalentsEmployee,
  handleJobType,
  handleAccountManager
};
