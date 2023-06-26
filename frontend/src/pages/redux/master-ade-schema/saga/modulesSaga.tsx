import apiMethod from "@/pages/api/apiMethod"
import { call, put } from "redux-saga/effects"
import { resCreateModule, resDelModule, resGetModule, resUpdateModule } from "../actions/actionReducer"

function* handleGetModule():any{
    try {
        const result = yield call(apiMethod.getModule)
        yield put(resGetModule(result))
    } catch (error) {
        yield put(resGetModule({message:error, status:400}))
    }
}

function* handleCreateModule(action :any):any{
    try {
        const result = yield call(apiMethod.createModule , action.payload)
        yield put(resCreateModule(result))
    } catch (error) {
        yield put(resCreateModule({message:error, status:400}))
    }
}

function* handleDelModule(action :any):any{
    try {
        const result = yield call(apiMethod.delModule , action.payload)
        yield put(resDelModule(result))
    } catch (error) {
        yield put(resDelModule({message:error, status:400}))
    }
}

function* handleUpdateModule(action :any):any{
    try {
        const result = yield call(apiMethod.updateModule , action.payload)
        yield put(resUpdateModule(result))
    } catch (error) {
        yield put(resUpdateModule({message:error, status:400}))
    }
}

export {
    handleGetModule,
    handleCreateModule,
    handleDelModule,
    handleUpdateModule
}