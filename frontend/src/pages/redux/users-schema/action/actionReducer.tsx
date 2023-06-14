import ActionTypes from './actionType';

//AuthLogin
export const doReqLogin = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_LOGIN,
    payload,
  };
};

export const doReqLoginResponse = (payload: any) => {
  return {
    type: ActionTypes.GET_LOGIN_RESPONSE,
    payload,
  };
};

//AuthSignUp
export const doReqSignup = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_SIGNUP,
    payload,
  };
};

export const doReqSignUpResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_SIGNUP,
    payload,
  };
};

// User
export const doRequestGetUser = () => {
  return {
    type: ActionTypes.REQ_GET_USER,
  };
};

export const doGetUserResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_USER,
    payload,
  };
};

// Get Profile
export const doRequestGetProfile = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_PROFILE,
    payload,
  };
};

export const doGetProfileResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_PROFILE,
    payload,
  };
};

//Update Profile
export const doRequestUpdateProfile = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_PROFILE,
    payload,
  };
};

export const doGetUpdateProfileResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_PROFILE,
    payload,
  };
};

//Update Password
export const doRequestUpdatePassword = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_PASSWORD,
    payload,
  };
};

export const doGetUpdatePasswordResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_PASSWORD,
    payload,
  };
};
