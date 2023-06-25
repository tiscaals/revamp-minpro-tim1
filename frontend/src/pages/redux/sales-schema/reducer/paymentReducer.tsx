import ActionTypesSales from "../action/actionType";

const initialState = {
    payment: [],
    pesan: '',
    status: 0,
    refresh: ''
}

function paymentReducers(state = initialState, action: any) {
    const {type, payload} = action;
    switch (type) {
        case ActionTypesSales.GET_PAYMENT_RES:
            return { state, payment: payload, refresh:true };
    default:
        return state;
    }
}

export default paymentReducers
