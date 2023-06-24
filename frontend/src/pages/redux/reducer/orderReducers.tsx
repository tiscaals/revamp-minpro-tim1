import ActionTypes from "../action/actionType";

const initialState = {
    order: [],
    messagee: '',
    status: 0,
    refresh: ''
}

function orderReducers(state = initialState, action: any) {
    const {type, payload} = action;
    console.log("orderReducer", payload);
    switch (type) {
        case ActionTypes.ADD_ORDER_RES:
            return { messagee: payload.message, status: payload.status, refresh:false };
    default:
        return state;
    }
}

export default orderReducers
