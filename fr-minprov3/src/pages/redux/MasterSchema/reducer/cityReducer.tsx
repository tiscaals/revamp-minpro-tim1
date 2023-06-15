import ActionTypes from "../action/actionType";

const initialState = {
    city: [],
    messageCity: "",
    statusCity: "",
    refreshCity: "",
  }; 
  
  function CityReducers(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.RES_GET_CITY:
        return { state, city: payload, refreshCity: true };
  
      default:
        return state;
    }
  }

  export default CityReducers