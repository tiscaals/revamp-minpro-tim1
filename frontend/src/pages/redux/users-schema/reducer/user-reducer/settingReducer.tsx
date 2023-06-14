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
    default:
      return state;
  }
}

export default settingReducers;
