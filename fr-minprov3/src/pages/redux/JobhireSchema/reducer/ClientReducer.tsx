import ActionTypes from "../action/actiontype";

const initialState = {
    client: [],
    message: "",
    status: "",
    refresh: "",
  }; 
  
  function ClientReducers(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
      case ActionTypes.RES_GET_CLIENT:
        return { state, client: payload, refresh: true };
      case ActionTypes.RES_ADD_CLIENT:
        return {
          message: payload.message,
          status: payload.status,
          message2:payload.result,
          refresh: false,
        };
      case ActionTypes.RES_UPDATE_CLIENT:
        return {
          message: payload.message,
          status: payload.status,
          refresh: false,
        };
      case ActionTypes.RES_DELETE_CLIENT:
        return {
          message: payload.message,
          status: payload.status,
          refresh: false,
        };
  
      default:
        return state;
    }
  }

  export default ClientReducers