import ActionTypes from '../../action/actionType';

const initialState = {
  city: [],
  message: '',
  status: 0,
  refresh: '',
};

function cityReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_CITY:
      return {
        state,
        city: payload,
        refresh: true,
      };
    default:
      return state;
  }
}

export default cityReducers;
