import { call, put } from 'redux-saga/effects';
import {
  doGetAddSkillsResponse,
  doGetDeleteSkillsResponse,
  doGetReqSkillsResponse,
} from '../../action/actionReducer';
import apiMethod from '@/pages/api/user-api/apimethod';

// Saga Profile Skill
export function* handleGetSkill(): any {
  try {
    const result = yield call(apiMethod.getSkill);
    yield put(doGetReqSkillsResponse(result.data.result));
  } catch (error: any) {
    yield put(doGetReqSkillsResponse({ message: error.message, status: 400 }));
  }
}

export function* handleAddSkills(action: any): any {
  try {
    const result = yield call(apiMethod.addSkill, action.payload);
    yield put(doGetAddSkillsResponse(result.data));
  } catch (error: any) {
    yield put(doGetAddSkillsResponse({ message: error.message, status: 400 }));
  }
}

export function* handleDeleteSkills(action: any): any {
  try {
    const result = yield call(apiMethod.removeSkill, action.payload);
    yield put(doGetDeleteSkillsResponse(result.data));
  } catch (error: any) {
    yield put(
      doGetDeleteSkillsResponse({ message: error.message, status: 400 })
    );
  }
}
