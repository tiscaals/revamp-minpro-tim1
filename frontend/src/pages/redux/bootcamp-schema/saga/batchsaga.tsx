import { call, put } from 'redux-saga/effects';
import apiMethod from '../apiMethod';
import {
  addBatchRes,
  deleteBatchRes,
  editParogRes,
  editPrapRes,
  getAllTalentsRes,
  editRes,
  getAllBatchesReq,
  getAllBatchesRes,
  getAllCandidatesRes,
  getAllProgramsRes,
  getAllRecStudentRes,
  getAllRoutesRes,
  getAllTraineesByBatchRes,
  getAllTrainersRes,
  getOneBatchesReq,
  getOneBatchesRes,
  UpdateChangeStatusBatchRes,
} from '../action/actionReducer';

function* handleGetAllBatches(): any {
  try {
    const result = yield call(apiMethod.findAllBatch);
    // console.log(result);
    yield put(getAllBatchesRes(result.data));
  } catch (error) {
    yield put(getAllBatchesRes({ message: error, status: 400 }));
  }
}

function* handleGetOneBatches(action: any): any {
  try {
    console.log('object');
    const result = yield call(apiMethod.findOne, action.payload);
    yield put(getOneBatchesRes(result.data));
  } catch (error) {
    yield put(getOneBatchesRes({ message: error, status: 400 }));
  }
}

function* handleGetAllPrograms(): any {
  try {
    const result = yield call(apiMethod.findAllPrograms);
    // console.log(result);
    yield put(getAllProgramsRes(result.data));
  } catch (error) {
    yield put(getAllProgramsRes({ message: error, status: 400 }));
  }
}

function* handleGetAllTalents(): any {
  try {
    const result = yield call(apiMethod.findAllTalents);
    console.log(result);
    yield put(getAllTalentsRes(result.data));
  } catch (error) {
    yield put(getAllTalentsRes({ message: error, status: 400 }));
  }
}

function* handleGetAllTrainers(): any {
  try {
    const result = yield call(apiMethod.findAllTrainers);
    yield put(getAllTrainersRes(result.data));
  } catch (error) {
    yield put(getAllTrainersRes({ message: error, status: 400 }));
  }
}

function* handleGetAllRecStudents(action: any): any {
  try {
    const result = yield call(apiMethod.findAllRecStudents, action.payload);
    yield put(getAllRecStudentRes(result.data));
  } catch (error) {
    yield put(getAllRecStudentRes({ message: error, status: 400 }));
  }
}

function* handleAddBatch(action: any): any {
  try {
    const result = yield call(apiMethod.createBatch, action.payload);
    yield put(addBatchRes(result.data));
  } catch (error) {
    yield put(addBatchRes({ message: error, status: 400 }));
  }
}

function* handleEditBatch(action: any): any {
  try {
    const result = yield call(apiMethod.editBatch, action.payload);
    yield put(editRes(result.data));
  } catch (error) {
    yield put(editRes({ message: error, status: 400 }));
  }
}

function* handleEditParog(action: any): any {
  try {
    const result = yield call(apiMethod.updateParog, action.payload);
    yield put(editParogRes(result.data));
  } catch (error) {
    yield put(editParogRes({ message: error, status: 400 }));
  }
}

function* handleEditPrap(action: any): any {
  try {
    const result = yield call(apiMethod.updatePrap, action.payload);
    yield put(editPrapRes(result.data));
  } catch (error) {
    yield put(editPrapRes({ message: error, status: 400 }));
  }
}

function* handleDelete(action: any): any {
  try {
    const result = yield call(apiMethod.deleteBatch, action.payload);
    yield put(deleteBatchRes(result.data));
  } catch (error) {
    yield put(deleteBatchRes({ message: error, status: 400 }));
  }
}

function* handleGetAllRoutes(): any {
  try {
    const result = yield call(apiMethod.findroutes);
    yield put(getAllRoutesRes(result.data));
  } catch (error) {
    yield put(getAllRoutesRes({ message: error, status: 400 }));
  }
}

function* handleGetAllCandidates(): any {
  try {
    const result = yield call(apiMethod.findAllCandidates);
    yield put(getAllCandidatesRes(result.data));
  } catch (error) {
    yield put(getAllCandidatesRes({ message: error, status: 400 }));
  }
}

function* handleGetAllTraineesByBatch(action: any): any {
  try {
    const result = yield call(apiMethod.findAllTraineesBatch, action.payload);
    yield put(getAllTraineesByBatchRes(result.data));
  } catch (error) {
    yield put(getAllTraineesByBatchRes({ message: error, status: 400 }));
  }
}

function* handleUpdateChangeStatusBatch(action: any): any {
  try {
    const result = yield call(
      apiMethod.updateChangeStatusBatch,
      action.payload
    );
    yield put(UpdateChangeStatusBatchRes(result));
  } catch (error) {
    yield put(UpdateChangeStatusBatchRes({ message: error, status: 400 }));
  }
}

export {
  handleGetAllTalents,
  handleGetAllBatches,
  handleAddBatch,
  handleGetAllPrograms,
  handleGetAllTrainers,
  handleGetAllRecStudents,
  handleDelete,
  handleEditBatch,
  handleGetOneBatches,
  handleGetAllRoutes,
  handleGetAllCandidates,
  handleEditParog,
  handleEditPrap,
  handleGetAllTraineesByBatch,
  handleUpdateChangeStatusBatch,
};
