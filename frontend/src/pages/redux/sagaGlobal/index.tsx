import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../curriculum-schema/action/actionType';
import {
  handleAddAllCurr,
  handleAddSections,
  handleAddSectionsDetail,
  handleGetAllCurr,
  handleGetCurr,
  handleViewSection,
  handleViewSectionDetail
} from '../curriculum-schema/saga/userSaga';
import ActionType from '../master-schema/action/actionType';
import { handleGetAllCat } from '../master-schema/saga/categorySaga';
import ActionTypesUser from '../users-schema/action/actionType';
import { handleGetUsers } from '../users-schema/saga/usersSaga';

function* watchAll() {
  yield all([
    takeEvery(ActionTypes.GET_CURRICULUM, handleGetAllCurr),
    takeEvery(ActionTypes.ADD_CURRICULUM, handleAddAllCurr),
    takeEvery(ActionTypes.GET_CURRNUMBER, handleGetCurr),
    takeEvery(ActionTypes.ADD_SECTION, handleAddSections),
    takeEvery(ActionTypes.ADD_SECTION_DETAIL, handleAddSectionsDetail),
    takeEvery(ActionTypes.VIEW_SECTION, handleViewSection),
    takeEvery(ActionTypes.VIEW_SECTION_DETAIL, handleViewSectionDetail),


    takeEvery(ActionType.GET_CATEGORY, handleGetAllCat),
    takeEvery(ActionTypesUser.GET_USERS, handleGetUsers),

  ]);

}

export default watchAll;
