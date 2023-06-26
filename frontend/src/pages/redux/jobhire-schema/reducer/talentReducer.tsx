import ActionTypes from '../action/actionType';

const initialState = {
  candidates: [],
  // client_detail: [],
  message: '',
  status: '',
  refresh: '',
};

function TalentReducers(state = initialState, action: any) {
  const { type, payload } = action;
  console.log('talentReducer payload', payload);
  switch (type) {
    case ActionTypes.RES_GET_CANDIDATE:
      return { ...state, candidates: payload, refresh: true };
    case ActionTypes.RES_UPDATE_CANDIDATE:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    default:
      return state;
  }
}

export default TalentReducers;
