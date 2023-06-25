import { takeEvery, all } from 'redux-saga/effects';
import ActionTypes from '../curriculum-schema/action/actionType';
import {
  handleAddAllCurr,
  handleAddSections,
  handleAddSectionsDetail,
  handleGetAll,
  handleGetAllCurr,
  handleGetCurr,
  handleGetCurrById,
  handleGetInstructor,
  handleUpdateProgram,
  // handleViewSection,
  // handleViewSectionDetail,
  handleViewSectionMerge,
  handleViewSectionMergeUp
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
    takeEvery(ActionTypes.UPDATE_CURRICULUM, handleUpdateProgram),

    takeEvery(ActionTypes.GET_SECTION_UP, handleViewSectionMergeUp),
    // takeEvery(ActionTypes.VIEW_SECTION_DETAIL, handleViewSectionDetail),
    takeEvery(ActionTypes.GET_CURR_BY_ID, handleGetCurrById),
    takeEvery(ActionTypes.GET_SECT_MERGE, handleViewSectionMerge),
    takeEvery(ActionTypes.GET_ALL, handleGetAll),
    takeEvery(ActionTypes.GET_INSTRUCTOR, handleGetInstructor),


    takeEvery(ActionType.GET_CATEGORY, handleGetAllCat),
    takeEvery(ActionTypesUser.GET_USERS, handleGetUsers),

  ]);

}

export default watchAll;
