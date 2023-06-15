import ActionTypes from "../action/actionType";

const initialState = {
    education: [],
    messageEdu: "",
    statusEdu: "",
    refreshEdu: "",
  }; 
  
  function EducationReducers(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.RES_GET_EDUCATION:
        return { state, education: payload, refreshEdu: true };
  
      default:
        return state;
    }
  }

  export default EducationReducers