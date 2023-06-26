import apimethod from '@/pages/api/apimethod'
import {call,put} from 'redux-saga/effects'
import { doGetTRANSACTIONResponse } from '../action/actionReducer'

function* handlegetAllTransaction():any {
    // console.log("wadwa");
    try {
        const result = yield call(apimethod.findAllTransaction)
        yield put (doGetTRANSACTIONResponse(result.data))
    } catch (error) {
        yield put(doGetTRANSACTIONResponse({message:error,status:400}))
    }
}

export {
    handlegetAllTransaction
}