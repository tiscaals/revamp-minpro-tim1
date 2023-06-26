import apiMethod from "@/pages/api/apiMethod"
import { call, put } from "redux-saga/effects"
import { resCreateProv, resDelProv, resGetProv, resUpdateProv } from "../actions/actionReducer"

function* handleGetProv():any{
    try {
        const result = yield call(apiMethod.getProv)
        yield put(resGetProv(result.data))
    } catch (error) {
        yield put(resGetProv({message:error, status:400}))
    }
}

function* handleDelProv(action : any):any{
    try {
        const result = yield call(apiMethod.delProv , action.payload)
        yield put(resDelProv(result.data))
    } catch (error) {
        yield put(resDelProv({message:error, status:400}))
    }
}
function* handleCreateProv(action : any):any{
    try {
        const result = yield call(apiMethod.createProv , action.payload)
        yield put(resCreateProv(result.data))
    } catch (error) {
        yield put(resCreateProv({message:error, status:400}))
    }
}
function* handleUpdateProv(action : any):any{
    try {
        const result = yield call(apiMethod.updateProv , action.payload)
        yield put(resUpdateProv(result.data))
    } catch (error) {
        yield put(resUpdateProv({message:error, status:400}))
    }
}

export {
    handleUpdateProv,
    handleCreateProv,
    handleGetProv,
    handleDelProv
}