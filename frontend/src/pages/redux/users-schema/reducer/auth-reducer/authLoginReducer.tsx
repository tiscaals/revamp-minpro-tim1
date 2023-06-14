import ActionTypes from '../../action/actionType';

const initialState = {
  token: [],
  message: '',
  status: 0,
  refresh: '',
};

export default function authLoginReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.GET_LOGIN_RESPONSE:
      return {
        state,
        token: payload,
        status: payload.status,
        message: payload.message,
        refresh: true,
      };
    default:
      return state;
  }
}
