import ActionTypes from '../action/actionType';

const initialState = {
  message: '',
  status: 0,
  refresh: '',
  //   trainees: [],
};

function evalReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_CREATE_EVALUATION:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default evalReducers;
