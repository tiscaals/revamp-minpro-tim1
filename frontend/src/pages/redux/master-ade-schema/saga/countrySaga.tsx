import apiMethod from "@/pages/api/apiMethod"
import { call, put } from "redux-saga/effects"
import { resDelCountry, resGetCountry , resCreateCountry, resUpdateCountry } from "../actions/actionReducer"

function* handleGetCountry ():any{
    // console.log('kntl',data)
    try {
        const result = yield call(apiMethod.getCountry)
        yield put(resGetCountry(result.data))
    } catch (error) {
        yield put(resGetCountry({message:error, status:400}))
    }
}

function* handleDelCountry (action :any):any{
    try {
        const result = yield call(apiMethod.DelCountry, action.payload)
        yield put(resDelCountry(result.data))
    } catch (error) {
        yield put(resDelCountry({message : error , status:400}))
    }
}

function* handleCreateCountry(action: any): any {
    try {
      const result = yield call(apiMethod.createCountry, action.payload);
      yield put(resCreateCountry(result.data));
    } catch (error) {
      yield put(resCreateCountry({ message: error, status: 400 }));
    }
  }

  function* handleUpdateCountry(action: any): any {
    try {
      const result = yield call(apiMethod.updateCountry, action.payload);
      yield put(resUpdateCountry(result.data));
    } catch (error) {
      yield put(resUpdateCountry({ message: error, status: 400 }));
    }
  }

export {
    handleGetCountry,
    handleDelCountry,
    handleCreateCountry,
    handleUpdateCountry
}