import ActionTypes from '../action/actionType';

const initialState = {
  message: '',
  status: 0,
  refresh: '',
  trainers: [],
};

function trainerReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_TRAINERS:
      return { state, trainers: payload.data, refresh: true };
    default:
      return state;
  }
}

export default trainerReducers;
