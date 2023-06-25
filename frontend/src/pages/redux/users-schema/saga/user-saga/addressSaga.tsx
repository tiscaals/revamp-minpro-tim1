import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/user-api/apimethod';
import {
  doGetAddAddressResponse,
  doGetAddressTypeResponse,
  doGetCityResponse,
  doGetDeleteAddressResponse,
  doGetUpdateAddressResponse,
} from '../../action/actionReducer';

//Saga Get Address Type And City
export function* handleGetAddressType(): any {
  try {
    const result = yield call(apiMethod.getAddressType);
    yield put(doGetAddressTypeResponse(result.data.result));
  } catch (error: any) {
    yield put(doGetAddressTypeResponse({ message: error, status: 400 }));
  }
}

export function* handleGetCity(): any {
  try {
    const result = yield call(apiMethod.getCity);
    yield put(doGetCityResponse(result.data.result));
  } catch (error: any) {
    yield put(doGetCityResponse({ message: error, status: 400 }));
  }
}

//Saga Profile Address
export function* handleAddAddress(action: any): any {
  try {
    const result = yield call(apiMethod.addAddress, action.payload);
    yield put(doGetAddAddressResponse(result.data));
  } catch (error: any) {
    yield put(doGetAddAddressResponse({ message: error.message, status: 400 }));
  }
}

export function* handleUpdateAddress(action: any): any {
  try {
    const result = yield call(apiMethod.updateAddress, action.payload);
    yield put(doGetUpdateAddressResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetUpdateAddressResponse({ message: error.message, status: 400 })
    );
  }
}

export function* handleDeleteAddress(action: any): any {
  try {
    const result = yield call(apiMethod.removeAddress, action.payload);
    yield put(doGetDeleteAddressResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetDeleteAddressResponse({ message: error.message, status: 400 })
    );
  }
}
