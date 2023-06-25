import { call, put } from "redux-saga/effects"
import { resCat, resCreateSkillType, resDelSkillType, resSkillTemplete, resSkillType, resUpdateSkillType } from "../actions/actionReducer"
import apiMethod from "@/pages/api/apiMethod"

function* handleGeSkillType ():any{
    try {
        const result = yield call(apiMethod.getallSkillType )
        console.log(result)
        yield put(resSkillType(result))
    } catch (error) {
        yield put(resSkillType({message:error, status:400}))
    }
}
function* handleCreateSkillType (action : any):any{
    // console.log('kntl',data)
    try {
        const result = yield call(apiMethod.createSkillType, action.payload)
        yield put(resCreateSkillType(result.data))
    } catch (error) {
        yield put(resCreateSkillType({message:error, status:400}))
    }
}

function* handleDelSkillType (action : any):any{
    // console.log('kntl',data)
    try {
        const result = yield call(apiMethod.delSkillType, action.payload)
        yield put(resDelSkillType(result.data))
    } catch (error) {
        yield put(resDelSkillType({message:error, status:400}))
    }
}

function* handleUpdateSkillType (action : any):any{
    try {
        const result = yield call(apiMethod.updateSkillType , action.payload)
        yield put(resUpdateSkillType(result.data))
    } catch (error) {
        yield put(resUpdateSkillType({message:error, status:400}))
    }
}

export {
    handleGeSkillType,
    handleCreateSkillType,
    handleDelSkillType,
    handleUpdateSkillType
}