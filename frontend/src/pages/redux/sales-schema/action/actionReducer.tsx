import ActionTypesSales from "./actionType"

const getAllCartReq = () => {
    return {
        type: ActionTypesSales.GET_CART,
    }
}

const getAllCartRes = (payload:any) => {
    return {
        type: ActionTypesSales.GET_CART_RESPONSE,
        payload
    }
}

const delCartReq = (payload : any) => {
    return {
        type: ActionTypesSales.DEL_CART,
        payload
    }
}

const delCartRes = (payload:any) => {
    return {
        type: ActionTypesSales.DEL_CART_RES,
        payload
    }
}

const getDiskonReq = () => {
    return {
        type: ActionTypesSales.GET_DISKON,
    }
}

const getDiskonRes = (payload:any) => {
    return {
        type: ActionTypesSales.GET_DISKON_RES,
        payload
    }
}

const addOrderReq = (payload:any) => {
    return {
        type: ActionTypesSales.ADD_ORDER,
        payload
    }
}

const addOrderRes = (payload:any) => {
    return {
        type: ActionTypesSales.ADD_ORDER_RES,
        payload
    }
}

const getPaymentReq = () => {
    return {
        type: ActionTypesSales.GET_PAYMENT,
    }
}

const getPaymentRes = (payload:any) => {
    return {
        type: ActionTypesSales.GET_PAYMENT_RES,
        payload
    }
}

export {
    getAllCartReq, 
    getAllCartRes,
    delCartReq, 
    delCartRes,
    getDiskonReq,
    getDiskonRes,
    addOrderReq,
    addOrderRes,
    getPaymentReq,
    getPaymentRes,
}





