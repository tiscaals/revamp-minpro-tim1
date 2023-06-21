import ActionTypes from "./actionType";

export const doRequestGetEducation = () => {
    return {
      type: ActionTypes.REQ_GET_EDUCATION,
    };
  };
  export const doResponseGetEducation = (payload: any) => {
    return {
      type: ActionTypes.RES_GET_EDUCATION,
      payload,
    };
  };
  

  export const doRequestGetWorktype = () => {
    return {
      type: ActionTypes.REQ_GET_WORKTYPE,
    };
  };
  export const doResponseGetWorktype = (payload: any) => {
    return {
      type: ActionTypes.RES_GET_WORKTYPE,
      payload,
    };
  };

  export const doRequestGetJobrole = () => {
    return {
      type: ActionTypes.REQ_GET_JOBROLE,
    };
  };
  export const doResponseGetJobrole = (payload: any) => {
    return {
      type: ActionTypes.RES_GET_JOBROLE,
      payload,
    };
  };

  export const doRequestGetIndustry = () => {
    return {
      type: ActionTypes.REQ_GET_INDUSTRY,
    };
  };
  export const doResponseGetIndustry = (payload: any) => {
    return {
      type: ActionTypes.RES_GET_INDUSTRY,
      payload,
    };
  };

  export const doRequestGetCity = () => {
    return {
      type: ActionTypes.REQ_GET_CITY,
    };
  };
  export const doResponseGetCity = (payload: any) => {
    return {
      type: ActionTypes.RES_GET_CITY,
      payload,
    };
  };

  export const doRequestGetRoac = () => {
    return {
      type: ActionTypes.REQ_GET_ROAC,
    };
  };
  export const doResponseGetRoac = (payload: any) => {
    console.log("actionReducer response", payload);
    return {
      type: ActionTypes.RES_GET_ROAC,
      payload,
    };
  };