import ActionTypes from '../action/actionType';

const initialState = {
  message: '',
  status: 0,
  refresh: '',
  praps: [],
};

function prapsReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_PRAP_PAROG:
      return { state,praps: payload.data, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default prapsReducers;
