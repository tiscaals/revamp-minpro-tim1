import ActionTypesPayment from '../action/actionType';

const initialstate = {
  fintech:[],
  message: '',
  status: 0,
};

function fintechReducer(state = initialstate, action: any) {
  // console.log(action);
  const { type, payload } = action;

  switch (type) {
    case ActionTypesPayment.GET_FINTECH_RESPONE:
      return { state, fintech: payload, status: payload.status, refresh: true };
    case ActionTypesPayment.ADD_FINTECH_RESPONSE:
      return { state, message: payload.message, status:payload.status, refresh: false };
    case ActionTypesPayment.UPDATE_FINTECH_RESPONSE:
      return { state, message: payload.message, refresh: false };
    case ActionTypesPayment.DELETE_FINTECH_RESPONSE:
      return { state, message: payload.message, status:payload.status, refresh: false };
    default:
      return state;
  }
}

export default fintechReducer;
