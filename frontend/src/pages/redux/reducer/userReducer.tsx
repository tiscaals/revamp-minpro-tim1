import ActionTypes from '../action/actionType';

const initialState = {
  users: [],
  message: '',
  status: 0,
  refresh: '',
};

function userReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_USER:
      return {
        state,
        users: payload,
        refresh: true,
      };
    default:
      return state;
  }
}

export default userReducers;
