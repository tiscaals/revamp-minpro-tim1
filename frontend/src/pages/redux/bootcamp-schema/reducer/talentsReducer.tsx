import ActionTypes from '../action/actionType';

const initialState = {
  talents: [],
  message: '',
  status: 0,
  refresh: '',
};

function talentsReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_TALENTS:
      return { state, talents: payload.result, refresh: true };

    default:
      return state;
  }
}

export default talentsReducers;
