import ActionTypes from "../action/actionType";

const initialState = {
    routes: [],
    messageRoac: "",
    statusRoac: "",
    refreshRoac: "",
  }; 
  
  function RouteactionReducers(state = initialState, action: any) {
    const { type, payload } = action;
    console.log("roacReducer",payload);
    switch (type) {
      case ActionTypes.RES_GET_ROAC:
        return { state, routes: payload, refreshRoac: true };
  
      default:
        return state;
    }
  }

  export default RouteactionReducers