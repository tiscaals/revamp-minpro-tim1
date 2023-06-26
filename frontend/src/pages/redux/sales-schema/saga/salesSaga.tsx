import { call, put } from 'redux-saga/effects';
import apimethod from '../apimethod';
import {
  addOrderRes,
  delCartRes,
  getAllCartRes,
  getDiskonRes,
  getPaymentRes,
} from '../action/actionReducer';

function* handleGetAllCart(): any {
  try {
    const result = yield call(apimethod.findAllCartItems);
    yield put(getAllCartRes(result.data));
  } catch (error) {
    yield put(getAllCartRes({ message: error, status: 400 }));
  }
}

function* handleDelCart(action: any): any {
  try {
    const result = yield call(apimethod.deleteCartItems, action.payload);
    yield put(delCartRes(result.data));
  } catch (error) {
    yield put(delCartRes({ message: error, status: 400 }));
  }
}

function* handleGetDiskon(): any {
  try {
    const result = yield call(apimethod.getDiskon);
    yield put(getDiskonRes(result.data));
  } catch (error) {
    yield put(getDiskonRes({ message: error, status: 400 }));
  }
}

function* handleAddOrder(action: any): any {
  try {
    console.log(action.payload);
    const result = yield call(apimethod.insertOrderJson, action.payload);
    yield put(addOrderRes(result.data));
  } catch (error) {
    yield put(addOrderRes({ message: error, status: 400 }));
  }
}

function* handleGetPayment(): any {
  try {
    const result = yield call(apimethod.getPayment);
    yield put(getPaymentRes(result.data));
  } catch (error) {
    yield put(getPaymentRes({ message: error, status: 400 }));
  }
}

export {
  handleGetAllCart,
  handleDelCart,
  handleGetDiskon,
  handleAddOrder,
  handleGetPayment,
};
