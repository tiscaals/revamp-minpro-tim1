import ActionTypes from '../action/actionType';

const initialState = {
  client: [],
  client_detail: [],
  message: '',
  status: '',
  refresh: '',
};

function ClientReducers(state = initialState, action: any) {
  const { type, payload } = action;
  console.log('clientReducer payload', payload);
  switch (type) {
    case ActionTypes.RES_GET_CLIENT:
      return { ...state, client: payload, refresh: true };
    case ActionTypes.RES_GET_CLIENTBYID:
      return { ...state, client_detail: payload, refresh: true };
    case ActionTypes.RES_ADD_CLIENT:
      return {
        message: payload.message,
        status: payload.status,
        message2: payload.result,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_CLIENT:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypes.RESET_STATE:
      return {
        initialState,
      };

    default:
      return state;
  }
}

export default ClientReducers;
