import ActionTypes from '../action/actionType';

const initialState = {
  message: '',
  status: 0,
  refresh: '',
};

export function authSignUpReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_SIGNUP:
      return {
        state,
        status: payload.status,
        message: payload.message,
        refresh: false,
      };
    default:
      return state;
  }
}
