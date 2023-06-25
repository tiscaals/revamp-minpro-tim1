import apimethod from '@/pages/api/apimethod';
import { call, put } from 'redux-saga/effects';
import {
  addCurrRes,
  addSectDetailReS,
  addSectRes,
  currById,
  currByIdRes,
  getAllCurrRes,
  getAlltableRes,
  getCurrnumberRes,
  getInstructor,
  getInstructorRes,
  getSectionMergeRes,
  updateCurrRes,
  viewSectionUpRes,
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

function* handleViewSectionMerge(): any {
  try {
    const result = yield call(apimethod.sectionMerge);
    yield put(getSectionMergeRes(result.data.mergedData));
  } catch (error) {
    yield put(getSectionMergeRes({ message: error, status: 400 }));
  }
}
function* handleViewSectionMergeUp(action: any): any {
  try {
    console.log(action.id);
    const result = yield call(apimethod.sectionMergeUp, action.id);
    console.log('halo', result.data.mergedData);
    yield put(viewSectionUpRes(result.data.mergedData));
  } catch (error) {
    yield put(viewSectionUpRes({ message: error, status: 400 }));
  }
}

function* handleGetAll(action: any): any {
  try {
    const result = yield call(apimethod.getAllTable, action.id);
    yield put(getAlltableRes(result.data[0]));
  } catch (error) {
    yield put(getAlltableRes({ message: error, status: 400 }));
  }
}

function* handleUpdateProgram(action: any): any {
  try {
    const result = yield call(
      apimethod.updateProgramEntity,
      action.id,
      action.payload
    );
    yield put(updateCurrRes(result.data));
  } catch (error) {
    yield put(updateCurrRes({ message: error, status: 400 }));
  }
}

// function* handleViewSectionDetail(): any {
//   try {
//     const result = yield call(apimethod.viewSectDetail);
//     console.log("test ", result.data[0]);
//     yield put(viewSectionDetailRes(result.data[0]));
//   } catch (error) {
//     yield put(viewSectionDetailRes({ message: error, status: 400 }));
//   }
// }

function* handleGetCurrById(action: any): any {
  try {
    const result = yield call(apimethod.currById, action.id);
    yield put(currByIdRes(result.data[0]));
  } catch (error) {
    yield put(currByIdRes({ message: error, status: 400 }));
  }
}

function* handleGetInstructor(action: any): any {
  try {
    const result = yield call(apimethod.getInstructor);
    yield put(getInstructorRes(result.data[0]));
  } catch (error) {
    yield put(getInstructorRes({ message: error, status: 400 }));
  }
}
export {
  handleGetAllCurr,
  handleAddAllCurr,
  handleGetCurr,
  handleAddSections,
  handleAddSectionsDetail,
  handleViewSectionMerge,
  handleGetCurrById,
  handleGetAll,
  handleUpdateProgram,
  handleGetInstructor,
  handleViewSectionMergeUp,
};
