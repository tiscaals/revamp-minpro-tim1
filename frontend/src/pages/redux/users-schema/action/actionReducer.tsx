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

// Role
export const doRequestGetRole = () => {
  return {
    type: ActionTypes.REQ_GET_ROLE,
  };
};

export const doGetRoleResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_ROLE,
    payload,
  };
};

export const doRequestUpdateRole = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_ROLE,
    payload,
  };
};

export const doGetUpdateRoleResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_ROLE,
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

//Add Email
export const doRequestAddEmail = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_EMAIL,
    payload,
  };
};

export const doGetAddEmailResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_EMAIL,
    payload,
  };
};

//Update Email
export const dotRequestUpdateEmail = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_EMAIL,
    payload,
  };
};

export const doGetUpdateEmailResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_EMAIL,
    payload,
  };
};

//Delete Email
export const doRequestDeleteEmail = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_EMAIL,
    payload,
  };
};

export const doGetDeleteEmailResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_EMAIL,
    payload,
  };
};

//Add Phone Number
export const doRequestAddPhoneNumber = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_PHONE,
    payload,
  };
};

export const doGetAddPhoneNumberResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_PHONE,
    payload,
  };
};

//Update Phone Number
export const doRequestUpdatePhoneNumber = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_PHONE,
    payload,
  };
};

export const doGetUpdatePhoneNumberResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_PHONE,
    payload,
  };
};

//Delete Phone Number
export const doRequestDeletePhone = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_PHONE,
    payload,
  };
};

export const doGetDeletePhoneResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_PHONE,
    payload,
  };
};

// Get Address Type & City
export const doReqAddressType = () => {
  return {
    type: ActionTypes.REQ_GET_ADDRESS_TYPE,
  };
};

export const doGetAddressTypeResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_ADDRESS_TYPE,
    payload,
  };
};

export const doReqCity = () => {
  return {
    type: ActionTypes.REQ_GET_CITY,
  };
};

export const doGetCityResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CITY,
    payload,
  };
};

// Add Address
export const doRequestAddAddress = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_ADDRESS,
    payload,
  };
};

export const doGetAddAddressResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_ADDRESS,
    payload,
  };
};

// Update Address
export const doRequestUpdateAddress = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_ADDRESS,
    payload,
  };
};

export const doGetUpdateAddressResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_ADDRESS,
    payload,
  };
};

//Delete Address
export const doRequestDeleteAddress = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_ADDRESS,
    payload,
  };
};

export const doGetDeleteAddressResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_ADDRESS,
    payload,
  };
};

// Add Education
export const doRequestAddEducation = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_EDUCATION,
    payload,
  };
};

export const doGetAddEducationResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_EDUCATION,
    payload,
  };
};

// Update Education
export const doRequestUpdateEducation = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_EDUCATION,
    payload,
  };
};

export const doGetUpdateEducationResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_EDUCATION,
    payload,
  };
};

//Delete Education
export const doRequestDeleteEducation = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_EDUCATION,
    payload,
  };
};

export const doGetDeleteEducationResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_EDUCATION,
    payload,
  };
};

// Add Experiences
export const doRequestAddExperiences = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_EXPERIENCES,
    payload,
  };
};

export const doGetAddExperiencesResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_EXPERIENCES,
    payload,
  };
};

//Update Experinces
export const doRequestUpdateExperiences = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_EXPERIENCES,
    payload,
  };
};

export const doGetUpdateExperiencesResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_EXPERIENCES,
    payload,
  };
};

//Delete Experiences
export const doRequestDeleteExperiences = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_EXPERIENCES,
    payload,
  };
};

export const doGetDeleteExperiencesResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_EXPERIENCES,
    payload,
  };
};

//Get Skill
export const doReqGetSkills = () => {
  return {
    type: ActionTypes.REQ_GET_SKILL,
  };
};

export const doGetReqSkillsResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_SKILL,
    payload,
  };
};

//Add Skill
export const doRequestAddSkills = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_SKILL,
    payload,
  };
};

export const doGetAddSkillsResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_SKILL,
    payload,
  };
};

//Delete Skill
export const doRequestDeleteSkills = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_SKILL,
    payload,
  };
};

export const doGetDeleteSkillsResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_SKILL,
    payload,
  };
};

//Apply Jobs
export const doRequestApplyJob = (payload: any) => {
  return {
    type: ActionTypes.REQ_APPLY_JOB,
    payload,
  };
};

export const doGetApplyJobResponse = (payload: any) => {
  return {
    type: ActionTypes.RES_APPLY_JOB,
    payload,
  };
};
