import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../action/actionType';
import {
  handleAddBatch,
  handleAddEvaluation,
  handleDelete,
  handleEditBatch,
  handleEditParog,
  handleEditPrap,
  handleGetAllBatches,
  handleGetAllCandidates,
  handleGetAllPrograms,
  handleGetAllRecStudents,
  handleGetAllRoutes,
  handleGetAllTalents,
  handleGetAllTraineesByBatch,
  handleGetAllTrainers,
  handleGetOneBatches,
  handleUpdateChangeStatusBatch,
} from './batchsaga';

function* watchAll() {
  yield all([
    takeEvery(ActionTypes.REQ_GET_BATCHES, handleGetAllBatches),
    takeEvery(ActionTypes.REQ_GET_BATCH, handleGetOneBatches),
    takeEvery(ActionTypes.REQ_CREATE_BATCH, handleAddBatch),
    takeEvery(ActionTypes.REQ_GET_PROGRAMS, handleGetAllPrograms),
    takeEvery(ActionTypes.REQ_GET_TRAINERS, handleGetAllTrainers),
    takeEvery(ActionTypes.REQ_GET_RECSTUDENTS, handleGetAllRecStudents),
    takeEvery(ActionTypes.REQ_DELETE_BATCH, handleDelete),
    takeEvery(ActionTypes.REQ_EDIT_BATCH, handleEditBatch),
    takeEvery(ActionTypes.REQ_GET_ROUTES, handleGetAllRoutes),
    takeEvery(ActionTypes.REQ_GET_CANDIDATES, handleGetAllCandidates),
    takeEvery(ActionTypes.REQ_UPDATE_PAROG, handleEditParog),
    takeEvery(ActionTypes.REQ_UPDATE_PRAP, handleEditPrap),
    takeEvery(ActionTypes.REQ_GET_TRAINEES_BATCH, handleGetAllTraineesByBatch),
    takeEvery(ActionTypes.REQ_GET_TALENTS, handleGetAllTalents),
    takeEvery(ActionTypes.REQ_CREATE_EVALUATION, handleAddEvaluation),
    takeEvery(ActionTypes.REQ_UPDATE_CHANGE_STATUS_BATCH, handleUpdateChangeStatusBatch)
  ]);
}

export default watchAll;
