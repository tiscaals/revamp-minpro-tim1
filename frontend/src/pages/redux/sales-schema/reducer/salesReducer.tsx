import ActionTypesSales from "../action/actionType";

const initialState = {
    items: [],
    message: '',
    status: 0,
    refresh: ''
}

function salesReducers(state = initialState, action: any) {
    const {type, payload} = action;
    switch (type) {
        case ActionTypesSales.GET_CART_RESPONSE:
            return { state, items: payload, refresh:true };
        case ActionTypesSales.ADD_CART_RES:
            return { message: payload.message, status: payload.status, refresh:false };
        case ActionTypesSales.DEL_CART_RES:
            return { state, refresh:false }
    default:
        return state;
    }
}

export default salesReducers
