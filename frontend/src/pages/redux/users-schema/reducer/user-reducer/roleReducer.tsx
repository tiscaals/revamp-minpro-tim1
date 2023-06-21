import ActionTypes from '../../action/actionType';

const initialState = {
  roles: [],
  message: '',
  status: 0,
  refresh: '',
};

function rolesReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_ROLE:
      return {
        state,
        roles: payload,
        refresh: true,
      };
    default:
      return state;
  }
}

export default rolesReducers;
