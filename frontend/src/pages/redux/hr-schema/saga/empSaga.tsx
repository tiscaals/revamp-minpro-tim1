import { call, put } from 'redux-saga/effects';
import apimethod from '../apiMethod';
import {
  getdataemployeeres,
  getdepartmentresponse,
  getdepthistoryresponse,
  getfindemployeeresponse,
  getmasterjororesponse,
  getsalaryhistoryresponse,
  getsearchresponse,
  gettalentsjobresponse,
  getupdateemployeeres,
  getusersrolesresponse,
} from '../action/actionReducer';

function* handleSearchEmp(): any {
  try {
    const result = yield call(apimethod.searchUser);
    yield put(getsearchresponse(result.data.result[0]));
  } catch (error) {
    yield put(getsearchresponse({ message: error, status: 400 }));
  }
}

function* handleDepartment(): any {
  try {
    const result = yield call(apimethod.department);
    yield put(getdepartmentresponse(result.data.result[0]));
  } catch (error) {
    yield put(getdepartmentresponse({ message: error, status: 400 }));
  }
}
function* handleMasterJoRo(): any {
  try {
    const result = yield call(apimethod.masterJoRo);
    yield put(getmasterjororesponse(result.data.result[0]));
  } catch (error) {
    yield put(getmasterjororesponse({ message: error, status: 400 }));
  }
}
function* handleUsersRoles(): any {
  try {
    const result = yield call(apimethod.usersRoles);
    yield put(getusersrolesresponse(result.data.result[0]));
  } catch (error) {
    yield put(getusersrolesresponse({ message: error, status: 400 }));
  }
}

function* handleCreateEmployee(action: any): any {
  try {
    const result = yield call(apimethod.createDataEmployee, action.payload);
    // console.log('ini gess', result);
    yield put(getdataemployeeres(result.data.result[0]));
  } catch (error) {
    yield put(getdataemployeeres({ message: error, status: 400 }));
  }
}

function* handleUpdateEmployee(action: any): any {
  try {
    const result = yield call(apimethod.updateEmployee, action.payload);
    console.log('ini gess', result);
    yield put(getupdateemployeeres(result.data.result[0]));
  } catch (error) {
    yield put(getupdateemployeeres({ message: error, status: 400 }));
  }
}

function* handleGetTalentsJob(): any {
  try {
    const result = yield call(apimethod.viewTalentsJob);
    yield put(gettalentsjobresponse(result.data.result[0]));
  } catch (error) {
    yield put(gettalentsjobresponse({ message: error, status: 400 }));
  }
}

function* handlefindEmployee(action: any): any {
  try {

    const result = yield call(apimethod.findEmployee, action.payload);

    yield put(getfindemployeeresponse(result.data.result[0][0]));
  } catch (error) {
    yield put(getfindemployeeresponse({ message: error, status: 400 }));
  }
}

function* handledeptHistory(action: any): any {
  try {

    const result = yield call(apimethod.deptHistory, action.payload);
    console.log('udah sampe sini', result.data.result[0])
    yield put(getdepthistoryresponse(result.data.result[0]));
  } catch (error) {
    yield put(getdepthistoryresponse({ message: error, status: 400 }));
  }
}

function* handlesalHistory(action: any): any {
  try {

    const result = yield call(apimethod.salaryHistory, action.payload);
    console.log('udah sampe sini', result.data.result[0])
    yield put(getsalaryhistoryresponse(result.data.result[0]));
  } catch (error) {
    yield put(getsalaryhistoryresponse({ message: error, status: 400 }));
  }
}



export {
  handleSearchEmp,
  handleCreateEmployee,
  handleDepartment,
  handleMasterJoRo,
  handleUsersRoles,
  handleGetTalentsJob,
  handlefindEmployee,
  handledeptHistory,
  handlesalHistory,
  handleUpdateEmployee

};
