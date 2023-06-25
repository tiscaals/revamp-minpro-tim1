import ActionTypes from '../../action/actionType';

const initialState = {
  token: [],
  profile: [],
  message: '',
  status: 0,
  refresh: '',
};

function settingReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_PROFILE:
      return {
        state,
        profile: payload.result,
        refresh: true,
      };
    case ActionTypes.RES_UPDATE_PROFILE:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_PASSWORD:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_ADD_EMAIL:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_EMAIL:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_DELETE_EMAIL:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_ADD_PHONE:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_PHONE:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_DELETE_PHONE:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_ADD_ADDRESS:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_ADDRESS:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_DELETE_ADDRESS:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_ADD_EDUCATION:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_EDUCATION:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_DELETE_EDUCATION:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_ADD_EXPERIENCES:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_EXPERIENCES:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_DELETE_EXPERIENCES:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_ADD_SKILL:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_DELETE_SKILL:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_APPLY_JOB:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    case ActionTypes.RES_APPLY_BOOTCAMP:
      return {
        state,
        profile: payload.result,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    default:
      return state;
  }
}

export default settingReducers;
