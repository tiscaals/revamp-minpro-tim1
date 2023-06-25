import ActionTypesUser from "../action/actionType";


const initialState = {
  users: [],
  message: '',
  status: 0,
  refresh: '',
};

function UsersReducers(state = initialState, action: any) {
  const { type, user} = action;
// console.log('payloads', payloads);
  switch (type) {
    case ActionTypesUser.GET_USERS_RES:
      return { state, users: user, refresh: true };
    default:
      return state;
  }
}

export default UsersReducers;
