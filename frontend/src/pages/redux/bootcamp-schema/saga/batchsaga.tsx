import { call, put } from 'redux-saga/effects';
import apiMethod from '../apiMethod';
import { addBatchRes, getAllBatchesReq, getAllBatchesRes, getAllProgramsRes, getAllTrainersRes } from '../action/actionReducer';

function* handleGetAllBatches():any{
    try {
        const result = yield call(apiMethod.findAllBatch)
        // console.log(result);
        yield put(getAllBatchesRes(result.data))
    } catch (error) {
        yield put(getAllBatchesRes({message:error, status:400}))
    }
}

function* handleGetAllPrograms():any{
    try {
        const result = yield call(apiMethod.findAllPrograms)
        // console.log(result);
        yield put(getAllProgramsRes(result.data))
    } catch (error) {
        yield put(getAllProgramsRes({message:error, status:400}))
    }
}

function* handleGetAllTrainers():any{
    try {
        const result = yield call(apiMethod.findAllTrainers)
        yield put(getAllTrainersRes(result.data))
    } catch (error) {
        yield put(getAllTrainersRes({message:error, status:400}))
    }
}

function* handleAddBatch(action:any):any{
    try {
        const result = yield call(apiMethod.createBatch, action.payload)
        yield put(addBatchRes(result.data))
    } catch (error) {
        yield put(addBatchRes({message:error, status:400}))
    }
}

export {
    handleGetAllBatches,
    handleAddBatch,
    handleGetAllPrograms,
    handleGetAllTrainers
}
