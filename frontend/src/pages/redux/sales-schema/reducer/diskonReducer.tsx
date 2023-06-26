import ActionTypesSales from '../action/actionType';

const initialState = {
  diskon: [],
  pesan: '',
  status: 0,
  refresh: '',
};

function diskonReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypesSales.GET_DISKON_RES:
      return { state, diskon: payload, refresh: true };
    default:
      return state;
  }
}

export default diskonReducers;
