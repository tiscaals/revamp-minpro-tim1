import { call, put } from 'redux-saga/effects'
import apimethod from '../../api/apimethod'
import { delCartRes, getAllCartRes } from '../action/actionReducer'

function* handleGetAllCart(): any {
  try {
    const result = yield call(apimethod.findAllCartItems)
    yield put(getAllCartRes(result.data))
  } catch (error) {
    yield put(getAllCartRes({ message: error, status: 400 }))
  }
}

function* handleDelCart(action:any):any {
  try {
    const result = yield call(apimethod.deleteCartItems, action)
    yield put(delCartRes(result.data))
  } catch (error) {
    yield put(delCartRes({ message: error, status:400 }))
  }
}

export { handleGetAllCart, handleDelCart }
