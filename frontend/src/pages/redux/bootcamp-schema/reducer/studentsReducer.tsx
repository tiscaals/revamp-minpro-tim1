import ActionTypes from '../action/actionType';

const initialState = {
  message: '',
  status: 0,
  refresh: '',
  recstudents: [],
};

function studentReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_RECSTUDENTS:
      return { state, recstudents: payload.data, refresh: true };
    default:
      return state;
  }
}

export default studentReducers;
