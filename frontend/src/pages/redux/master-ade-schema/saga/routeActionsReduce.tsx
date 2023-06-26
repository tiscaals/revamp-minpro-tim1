import apiMethod from "@/pages/api/apiMethod"
import { call, put } from "redux-saga/effects"
import { resCreateRouteActions, resDelRouteActions, resGetRouteActions, resUpdateDisplayRouteActions, resUpdateRouteActions } from "../actions/actionReducer"

function* handleGetRouteActions():any{
    try {
        const result = yield call(apiMethod.getRouteActions)
        yield put(resGetRouteActions(result.data))
    } catch (error) {
        yield put(resGetRouteActions({message:error, status:400}))
    }
}

function* handleDelRouteActions(action : any):any{
    try {
        const result = yield call(apiMethod.delRouteActions , action.payload)
        yield put(resDelRouteActions(result.data))
    } catch (error) {
        yield put(resDelRouteActions({message:error, status:400}))
    }
}

function* handleCreateRouteActions(action : any):any{
    try {
        const result = yield call(apiMethod.createRA , action.payload)
        yield put(resCreateRouteActions(result.data))
    } catch (error) {
        yield put(resCreateRouteActions({message:error, status:400}))
    }
}

function* handleUpdateRouteActions(action : any):any{
    try {
        const result = yield call(apiMethod.updateRA , action.payload)
        yield put(resUpdateRouteActions(result.data))
    } catch (error) {
        yield put(resUpdateRouteActions({message:error, status:400}))
    }
}

function* handleUpdateDisplayRouteActions(action : any):any{
    try {
        const result = yield call(apiMethod.updateRA , action.payload)
        yield put(resUpdateDisplayRouteActions(result.data))
    } catch (error) {
        yield put(resUpdateDisplayRouteActions({message:error, status:400}))
    }
}
export {
    handleUpdateRouteActions,
    handleGetRouteActions,
    handleDelRouteActions,
    handleCreateRouteActions,
    handleUpdateDisplayRouteActions
}