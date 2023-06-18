import ActionTypes from '../action/actionType';

const initialState = {
  message: '',
  status: 0,
  refresh: '',
  candidates: [],
};

function candidateReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_CANDIDATES:
      return { state, candidates: payload.data, refresh: true };
    case ActionTypes.RES_UPDATE_PAROG:
      return { state, message: payload.message, refresh: false };
    case ActionTypes.RES_UPDATE_PRAP:
      return { state, message: payload.message, refresh: false };
    default:
      return state;
  }
}

export default candidateReducers;
