import ActionTypes from "../action/actionType";

const initialState = {
    items: [],
    message: '',
    status: 0,
    refresh: ''
}

function salesReducers(state = initialState, action: any) {
    const {type, payload} = action;
    switch (type) {
        case ActionTypes.GET_CART_RESPONSE:
            return { state, items: payload, refresh:true };
        case ActionTypes.ADD_CART_RES:
            return { message: payload.message, status: payload.status, refresh:false };
        case ActionTypes.DEL_CART_RES:
            return { message: payload.message, status: payload.status, refresh:false }
    default:
        return state;
    }
}

export default salesReducers
