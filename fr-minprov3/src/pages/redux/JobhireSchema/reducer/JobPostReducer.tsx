import ActionTypes from "../action/actiontype";

const initialState = {
    job_post: [],
    cur_number:[],
    message: "",
    status: "",
    refresh: "",
    message2:"",
  }; 
  
  function JobPostReducers(state = initialState, action: any) {
    const { type, payload ,cur_number } = action;
    switch (type) {
      case ActionTypes.RES_GET_JOBPOST:
        return { state, job_post: payload, refresh: true };

      case ActionTypes.RES_GET_CURNUMBER:
        return { state, cur_number: cur_number, refresh: true };


      case ActionTypes.RES_ADD_JOBPOST:
        return {
          message: payload.message,
          status: payload.status,
          message2:payload.result,
          refresh: false,
        };
      case ActionTypes.RES_UPDATE_JOBPOST:
        return {
          message: payload.message,
          status: payload.status,
          refresh: false,
        };
      case ActionTypes.RES_DELETE_JOBPOST:
        return {
          message: payload.message,
          status: payload.status,
          refresh: false,
        };
  
      default:
        return state;
    }
  }

  export default JobPostReducers