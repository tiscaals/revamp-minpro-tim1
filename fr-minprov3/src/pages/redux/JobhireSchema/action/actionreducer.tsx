import ActionTypes from "./actiontype";


/*------------ JOB POST SECTION -------------*/
export const doRequestGetJobPost = () => {
    return {
      type: ActionTypes.REQ_GET_JOBPOST,
    };
  };
  export const doResponseGetJobPost = (payload: any) => {
    return {
      type: ActionTypes.RES_GET_JOBPOST,
      payload,
    };
  };

  export const doRequestGetCurnumber = () => {
    return {
      type: ActionTypes.REQ_GET_CURNUMBER,
    };
  };
  export const doResponseGetCurnumber = (cur_number: any) => {
    return {
      type: ActionTypes.RES_GET_CURNUMBER,
      cur_number,
    };
  };

  
  export const doRequestAddJobPost = (payload: any) => {
    return {
      type: ActionTypes.REQ_ADD_JOBPOST,
      payload,
    };
  };
  
  export const doResponseAddJobPost = (payload: any) => {
    return {
      type: ActionTypes.RES_ADD_JOBPOST,
      payload,
    };
  };

  export const doRequestUpdateJobPost = (payload: any) => {
    return {
      type: ActionTypes.REQ_UPDATE_JOBPOST,
      payload,
    };
  };
  
  export const doResponseUpdateJobPost = (payload: any) => {
    return {
      type: ActionTypes.RES_UPDATE_JOBPOST,
      payload,
    };
  };

  export const doRequestDeleteJobPost = (payload: any) => {
    return {
      type: ActionTypes.REQ_DELETE_JOBPOST,
      payload,
    };
  };
  
  export const doResponseDeleteJobPost = (payload: any) => {
    return {
      type: ActionTypes.RES_DELETE_JOBPOST,
      payload,
    };
  };

  
/*------------ CLIENT SECTION -------------*/

export const doRequestGetClient = () => {
  return {
    type: ActionTypes.REQ_GET_CLIENT,
  };
};
export const doResponseGetClient = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CLIENT,
    payload,
  };
};


export const doRequestAddClient = (payload: any) => {
  return {
    type: ActionTypes.REQ_ADD_CLIENT,
    payload,
  };
};

export const doResponseAddClient = (payload: any) => {
  return {
    type: ActionTypes.RES_ADD_CLIENT,
    payload,
  };
};

export const doRequestUpdateClient = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_CLIENT,
    payload,
  };
};

export const doResponseUpdateClient = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_CLIENT,
    payload,
  };
};

export const doRequestDeleteClient = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_CLIENT,
    payload,
  };
};

export const doResponseDeleteClient = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_CLIENT,
    payload,
  };
};

/*--------------- EMPLOYEE RANGE SECTION ---------------*/

export const doRequestGetEmprange = () => {
  return {
    type: ActionTypes.REQ_GET_EMPRANGE,
  };
};
export const doResponseGetEmprange = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_EMPRANGE,
    payload,
  };
};