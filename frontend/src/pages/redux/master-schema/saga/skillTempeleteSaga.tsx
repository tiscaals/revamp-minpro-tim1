import { call, put } from "redux-saga/effects"
import { resCat, resCreateSkillTemplete, resDelSkillTemplete, resSkillTemplete, resUpdateSkillTemplete } from "../actions/actionReducer"
import apiMethod from "@/pages/api/apiMethod"

function* handleGetSkillTemplete ():any{
    try {
        const result = yield call(apiMethod.getallSkillTemplete )
        yield put(resSkillTemplete(result.data))
    } catch (error) {
        yield put(resSkillTemplete({message:error, status:400}))
    }
}

function* handleDelSkillTemplete (action : any):any{
    try {
        const result = yield call(apiMethod.delSKillTemplete ,action.payload)
        yield put(resDelSkillTemplete(result.data))
    } catch (error) {
        yield put(resDelSkillTemplete({message:error, status:400}))
    }
}

function* handleUpdateSkillTemplete (action : any):any{
    try {
        const result = yield call(apiMethod.updateST ,action.payload)
        yield put(resUpdateSkillTemplete(result.data))
    } catch (error) {
        yield put(resUpdateSkillTemplete({message:error, status:400}))
    }
}

function* handleCreateSkillTemplete (action : any):any{
    try {
        const result = yield call(apiMethod.createST ,action.payload)
        yield put(resCreateSkillTemplete(result.data))
    } catch (error) {
        yield put(resCreateSkillTemplete({message:error, status:400}))
    }
}
export {
    handleCreateSkillTemplete,
    handleUpdateSkillTemplete,
    handleGetSkillTemplete,
    handleDelSkillTemplete
}