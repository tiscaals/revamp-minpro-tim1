import ActionTypes from '../action/actionType';

const initialState = {
  message: '',
  status: 0,
  refresh: '',
  trainees: [],
};

function traineeReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_TRAINEES_BATCH:
      return { state, trainees: payload.data, refresh: true };
    case ActionTypes.RES_UPDATE_TRAINEE_STATUS:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default traineeReducers;
