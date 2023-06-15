import ActionTypes from "../action/actionType";

const initialState = {
    work_type: [],
    message: "",
    status: "",
    refresh: "",
  }; 
  
  function WorktypeReducers(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.RES_GET_WORKTYPE:
        return { state, work_type: payload, refresh: true };
  
      default:
        return state;
    }
  }

  export default WorktypeReducers