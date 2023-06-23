import { call, put } from 'redux-saga/effects';
import apiMethod from '@/pages/api/user-api/apimethod';
import {
  doGetAddExperiencesResponse,
  doGetDeleteExperiencesResponse,
  doGetUpdateExperiencesResponse,
} from '../../action/actionReducer';

//Saga Profile Experiences
export function* handleAddExperiences(action: any): any {
  try {
    const result = yield call(apiMethod.addExperiences, action.payload);
    yield put(doGetAddExperiencesResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetAddExperiencesResponse({ message: error.message, status: 400 })
    );
  }
}

export function* handleEditExperiences(action: any): any {
  try {
    const result = yield call(apiMethod.updateExperiences, action.payload);
    yield put(doGetUpdateExperiencesResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetUpdateExperiencesResponse({ message: error.message, status: 400 })
    );
  }
}

export function* handleDeleteExperiences(action: any): any {
  try {
    const result = yield call(apiMethod.removeExperiences, action.payload);
    yield put(doGetDeleteExperiencesResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetDeleteExperiencesResponse({ message: error.message, status: 400 })
    );
  }
}
