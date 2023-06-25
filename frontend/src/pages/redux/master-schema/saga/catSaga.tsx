
import { call, put } from "redux-saga/effects"
import { resCat, resCreateCat, resDelCat, resUpdateCat } from "../actions/actionReducer"
import apiMethod from "@/pages/api/apiMethod"

function* handleGetCat ():any{
    try {
        const result = yield call(apiMethod.getallCat )
        yield put(resCat(result.data))
    } catch (error) {
        yield put(resCat({message:error, status:400}))
    }
}

function* handleCreateCat (action : any):any{
    // console.log('kntl',data)
    try {
        const result = yield call(apiMethod.createCat, action.payload)
        yield put(resCreateCat(result.data))
    } catch (error) {
        yield put(resCreateCat({message:error, status:400}))
    }
}

function* handleupdateCat (action: any) :any{
    console.log('ct', action)
    try {
        const result = yield call(apiMethod.updateCat , action.payload)
        console.log('ct', action.payload)
        yield put(resUpdateCat(result.data))
    } catch (error) {
        yield put(resUpdateCat({message:error, status:400}))
    }
}

function* handleDelCat (id : any):any{
    try {
        const result = yield call(apiMethod.delCat ,id.payload)
        yield put(resDelCat(result.data))
    } catch (error) {
        yield put(resDelCat({message:error, status:400}))
    }
}

export {
    handleGetCat,
    handleCreateCat,
    handleDelCat,
    handleupdateCat,

}