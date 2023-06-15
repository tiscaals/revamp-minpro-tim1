import ActionTypes from "../action/actionType";

const initialState = {
    industry: [],
    messageIndu: "",
    statusIndu: "",
    refreshIndu: "",
  }; 
  
  function IndustryReducers(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.RES_GET_INDUSTRY:
        return { state, industry: payload, refresh: true };
  
      default:
        return state;
    }
  }

  export default IndustryReducers