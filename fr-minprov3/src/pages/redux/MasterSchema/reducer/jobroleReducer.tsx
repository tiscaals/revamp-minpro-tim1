import ActionTypes from "../action/actionType";

const initialState = {
    job_role: [],
    message: "",
    status: "",
    refresh: "",
  }; 
  
  function JobroleReducers(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.RES_GET_JOBROLE:
        return { state, job_role: payload, refresh: true };
  
      default:
        return state;
    }
  }

  export default JobroleReducers