import ActionTypesPayment from '../action/actionType';

const initialstate = {
  account:[],
  message: "",
  status: 0,
  refresh:''
};

function AccountReducer(state = initialstate, action: any) {
  const { type, payload } = action;
  // console.log(action,"wakodkwaok");
  switch (type) {
    case ActionTypesPayment.GET_ACCOUNT_RESPONE:
      return {state,account: payload,status: payload.status,refresh: true,};
    case ActionTypesPayment.ADD_ACCOUNT_RESPONSE:
      return {state, message: payload.message, status: payload.status, refresh: false };
    case ActionTypesPayment.UPDATE_ACCOUNT_RESPONSE:
        return {message:payload.message,status:payload.status,refresh: false}
    case ActionTypesPayment.DELETE_ACCOUNT_RESPONSE:
        return {state,message:payload.message,refresh: false }
    default:
      return state;
  }
}

export default AccountReducer;
