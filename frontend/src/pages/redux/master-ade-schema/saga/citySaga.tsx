import apiMethod from "@/pages/api/apiMethod"
import { call, put } from "redux-saga/effects"
import { resCreateCity, resDelCity, resGetCity, resUpdateCity } from "../actions/actionReducer"

function* handleGetCity():any{
    try {
        const result = yield call(apiMethod.getCity)
        yield put(resGetCity(result.data))
    } catch (error) {
        yield put(resGetCity({message:error, status:400}))
    }
}

function* handleDelCity(action : any):any{
    try {
        const result = yield call(apiMethod.delCity , action.payload)
        yield put(resDelCity(result.data))
    } catch (error) {
        yield put(resDelCity({message:error, status:400}))
    }
}

function* handleCreateCity(action : any):any{
    try {
        const result = yield call(apiMethod.createCity , action.payload)
        yield put(resCreateCity(result.data))
    } catch (error) {
        yield put(resCreateCity({message:error, status:400}))
    }
}
function* handleUpdateCity(action : any):any{
    try {
        const result = yield call(apiMethod.updateCity , action.payload)
        yield put(resUpdateCity(result.data))
    } catch (error) {
        yield put(resUpdateCity({message:error, status:400}))
    }
}
export {
    handleUpdateCity,
    handleCreateCity,
    handleGetCity,
    handleDelCity
}