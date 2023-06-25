import apiMethod from "@/pages/api/apiMethod"
import { call, put } from "redux-saga/effects"
import { resCreateAddressType, resDelAddressType, resGetAddressType, resUpdateAddressType } from "../actions/actionReducer"

function* handleGetAddressType():any{
    try {
        const result = yield call(apiMethod.getAddressType)
        yield put(resGetAddressType(result))
    } catch (error) {
        yield put(resGetAddressType({message:error, status:400}))
    }
}

function* handleCreateAddressType(action : any):any{
    try {
        const result = yield call(apiMethod.createAddType , action.payload)
        yield put(resCreateAddressType(result))
    } catch (error) {
        yield put(resCreateAddressType({message:error, status:400}))
    }
}

function* handleUpdateAddressType(action : any):any{
    console.log('sampe sini ', action)
    try {
        const result = yield call(apiMethod.updateAddressType , action.payload)
        yield put(resUpdateAddressType(result))
    } catch (error) {
        yield put(resUpdateAddressType({message:error, status:400}))
    }
}

function* handleDelAddressType(action : any):any{
    try {
        const result = yield call(apiMethod.deleteAddressType, action.payload)
        yield put(resDelAddressType(result))
    } catch (error) {
        yield put(resDelAddressType({message:error, status:400}))
    }
}
export {
    handleGetAddressType,
    handleCreateAddressType,
    handleUpdateAddressType,
    handleDelAddressType
}