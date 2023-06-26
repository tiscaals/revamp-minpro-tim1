import ActionTypes from '../hr-schema/action/actionType';
import { takeEvery, all } from 'redux-saga/effects';
import {
  handleAccountManager,
  handleGetEmployee,
  handleGetTalents,
  handleJobType,
  handleSearchClient,
  handleTalentsEmployee,
} from '../hr-schema/saga/hrSaga';
import {
  handleCreateEmployee,
  handleDepartment,
  handleMasterJoRo,
  handleSearchEmp,
  handleUsersRoles,
  handleGetTalentsJob,
  handlefindEmployee,
  handledeptHistory,
  handlesalHistory,
  handleUpdateEmployee,
} from '../hr-schema/saga/empSaga';

function* watchAll() {
  yield all([takeEvery(ActionTypes.REQ_GET_EMPLOYEE, handleGetEmployee)]);
  yield all([takeEvery(ActionTypes.REQ_GET_SEARCH, handleSearchEmp)]);
  yield all([takeEvery(ActionTypes.REQ_GET_DEPARTMENT, handleDepartment)]);
  yield all([takeEvery(ActionTypes.REQ_GET_JOROMASTER, handleMasterJoRo)]);
  yield all([takeEvery(ActionTypes.REQ_GET_USERSROLES, handleUsersRoles)]);
  yield all([takeEvery(ActionTypes.REQ_GET_JOBTYPE, handleJobType)]);
  yield all([takeEvery(ActionTypes.REQ_GET_AM, handleAccountManager)]);
  yield all([
    takeEvery(ActionTypes.REQ_CREATE_DATA_EMPLOYEE, handleCreateEmployee),
  ]);
  yield all([
    takeEvery(ActionTypes.REQ_UPDATE_EMPLOYEE, handleUpdateEmployee),
  ]);
  yield all([takeEvery(ActionTypes.REQ_GET_TALENTS, handleGetTalents)]);
  yield all([takeEvery(ActionTypes.REQ_GET_TALENTS_JOB, handleGetTalentsJob)]);
  yield all([takeEvery(ActionTypes.REQ_SEARCH_CLIENT, handleSearchClient)]);
  yield all([
    takeEvery(ActionTypes.REQ_TALENTS_EMPLOYEE, handleTalentsEmployee),
  ]);
  yield all([takeEvery(ActionTypes.REQ_FIND_EMPLOYEE, handlefindEmployee),]);
  yield all([takeEvery(ActionTypes.REQ_DEPT_HISTORY, handledeptHistory),]);
  yield all([takeEvery(ActionTypes.REQ_SALARY_HISTORY, handlesalHistory),]);
}

export default watchAll;
