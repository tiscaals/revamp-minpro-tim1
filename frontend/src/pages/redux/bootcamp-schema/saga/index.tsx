import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../action/actionType';
import { handleAddBatch, handleGetAllBatches, handleGetAllPrograms, handleGetAllTalents, handleGetAllTrainers, handleUpdateCloseBatch } from './batchsaga';
// import { handleAddUser, handleDeleteUser, handleGetAllUser, handleUpdatePassword, handleUpdateUser } from "./userSaga";
// import { handleAddProduct, handleDeleteProduct, handleGetAllProduct, handleGetProductById, handleUpdateProduct } from "./productSaga";
// import { handleGetAllCategories } from "./categorySaga";
// import { handleLogin } from "./loginSaga";

function* watchAll(){
    yield all([
        takeEvery(ActionTypes.REQ_GET_BATCHES, handleGetAllBatches),
        takeEvery(ActionTypes.REQ_CREATE_BATCH, handleAddBatch),
        takeEvery(ActionTypes.REQ_GET_PROGRAMS, handleGetAllPrograms),
        takeEvery(ActionTypes.REQ_GET_TRAINERS, handleGetAllTrainers),
        takeEvery(ActionTypes.REQ_GET_TALENTS, handleGetAllTalents),
        takeEvery(ActionTypes.REQ_UPDATE_CLOSE_BATCH, handleUpdateCloseBatch)

    ])
}

export default watchAll;
