import apimethod from '@/pages/api/apimethod';
import { call, put } from 'redux-saga/effects';
import {
  addCurrRes,
  addSectDetailReS,
  addSectRes,
  getAllCurrRes,
  getCurrnumberRes,
  viewSectionDetailRes,
  viewSectionRes,
} from '../action/actionReducer';

function* handleGetAllCurr(): any {
  try {
    const result = yield call(apimethod.findAllCurr);
    yield put(getAllCurrRes(result.data[0]));
  } catch (error) {
    yield put(getAllCurrRes({ message: error, status: 400 }));
  }
}

function* handleAddAllCurr(action: any): any {
  try {
    // const data = action.payload.get('title');
    // console.log(data);
    const result = yield call(apimethod.createCurr, action.payload);
    yield put(addCurrRes(result.data));
    // console.log('saga', result.data);
  } catch (error) {
    yield put(addCurrRes({ message: error, status: 400 }));
  }
}

function* handleAddSections(action: any): any {
  try {
    const result = yield call(apimethod.createSection, action.payload);
    yield put(addSectRes(result.data));
    console.log('result.data', result.data);
  } catch (error) {
    yield put(addSectRes({ message: error, status: 400 }));
  }
}

function* handleAddSectionsDetail(action: any): any {
  try {
    const result = yield call(
      apimethod.createSectionDetail,
      action.id,
      action.payload
    );
    yield put(addSectDetailReS(result.data));
  } catch (error) {
    yield put(addSectDetailReS({ message: error, status: 400 }));
  }
}

function* handleGetCurr(): any {
  try {
    const result = yield call(apimethod.getCurrnumber);
    // console.log("SAGA", result);
    yield put(getCurrnumberRes(result.data));
  } catch (error) {
    yield put(getCurrnumberRes({ message: error, status: 400 }));
  }
}

function* handleViewSection(): any {
  try {
    // console.log('halo');
    const result = yield call(apimethod.viewSection);
    yield put(viewSectionRes(result.data[0]));
  } catch (error) {
    yield put(viewSectionRes({ message: error, status: 400 }));
  }
}


function* handleViewSectionDetail(): any {
  try {
    const result = yield call(apimethod.viewSectDetail);
    console.log("test ", result.data[0]);
    yield put(viewSectionDetailRes(result.data[0]));
  } catch (error) {
    yield put(viewSectionDetailRes({ message: error, status: 400 }));
  }
}
export {
  handleGetAllCurr,
  handleAddAllCurr,
  handleGetCurr,
  handleAddSections,
  handleAddSectionsDetail,
  handleViewSection,
  handleViewSectionDetail
};
