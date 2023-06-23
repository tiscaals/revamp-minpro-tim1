import ActionTypes from '../../action/actionType';

const initialState = {
  addr_type: [],
  message: '',
  status: 0,
  refresh: '',
};

function addressTypeReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_ADDRESS_TYPE:
      return {
        state,
        addr_type: payload,
        refresh: true,
      };
    default:
      return state;
  }
}

export default addressTypeReducers;
