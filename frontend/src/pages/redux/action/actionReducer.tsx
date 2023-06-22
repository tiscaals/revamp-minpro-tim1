import ActionTypes from "./actionType";

const getAllCartReq = () => {
    return {
        type: ActionTypes.GET_CART,
    }
}

const getAllCartRes = (payload:any) => {
    return {
        type: ActionTypes.GET_CART_RESPONSE,
        payload
    }
}

const delCartReq = (payload : any) => {
    return {
        type: ActionTypes.DEL_CART,
        payload
    }
}

const delCartRes = (payload:any) => {
    return {
        type: ActionTypes.DEL_CART_RES,
        payload
    }
}

const getDiskonReq = () => {
    return {
        type: ActionTypes.GET_DISKON,
    }
}

const getDiskonRes = (payload:any) => {
    return {
        type: ActionTypes.GET_DISKON_RES,
        payload
    }
}

const addOrderReq = (payload:any) => {
    return {
        type: ActionTypes.ADD_ORDER,
        payload
    }
}

const addOrderRes = (payload:any) => {
    return {
        type: ActionTypes.ADD_ORDER_RES,
        payload
    }
}

const getPaymentReq = () => {
    return {
        type: ActionTypes.GET_PAYMENT,
    }
}

const getPaymentRes = (payload:any) => {
    return {
        type: ActionTypes.GET_PAYMENT_RES,
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





// //USER
// const getAllUserReq = () => {
//     return{
//         type: ActionTypes.GET_USERS,
//     }
// }

// const getAllUserRes = (payload:any) => {
//     return{
//         type: ActionTypes.GET_USERS_RES,
//         payload
//     }
// }

// const addCustomerReq = (payload:any) => {
//     return{
//         type: ActionTypes.ADD_USER,
//         payload
//     }
// }

// const addCustomerRes = (payload:any) => {
//     return{
//         type: ActionTypes.ADD_USER_RES,
//         payload
//     }
// }

// const updateCustomerReq = (data:any, id:any) => {
//     return{
//         type: ActionTypes.UPDATE_USER,
//         payload: {data, id}
//     }
// }

// const updateCustomerRes = (payload:any) => {
//     return{
//         type: ActionTypes.UPDATE_USER_RES,
//         payload
//     }
// }

// const deleteUserReq = (payload:any) => {
//     return{
//         type: ActionTypes.DEL_USER,
//         payload
//     }
// }

// const deleteUserRes = (payload:any) => {
//     return{
//         type: ActionTypes.DEL_USER_RES,
//         payload
//     }
// }

// const updatePasswordReq = (data:any, id:any) => {
//     return{
//         type: ActionTypes.UPDATE_PASSWORD,
//         payload: {data, id}
//     }
// }

// const updatePasswordRes = (payload:any) =>{
//     return{
//         type: ActionTypes.UPDATE_PASSWORD_RES,
//         payload
//     }
// }


// // PRODUCT
// const getAllProductReq = () =>{
//     return{
//         type: ActionTypes.GET_PRODUCT,
//     }
// }

// const getAllProductRes = (payload:any) =>{
//     // console.log("ISI PAYLOAD",payload);
//     return{
//         type: ActionTypes.GET_PRODUCT_RES,
//         payload
//     }
// }

// const getProductByIdReq = (payload:any) =>{
//     return{
//         type: ActionTypes.GET_PRODUCT_ID,
//         payload
//     }
// }

// const getProductByIdRes = (payload:any) =>{
//     // console.log("ISI PAYLOAD",payload);
//     return{
//         type: ActionTypes.GET_PRODUCT_ID_RES,
//         payload
//     }
// }

// const addProductReq = (payload:any) =>{
//     return{
//         type: ActionTypes.ADD_PRODUCT,
//         payload
//     }
// }

// const addProductRes = (payload:any) =>{
//     return{
//         type: ActionTypes.ADD_PRODUCT_RES,
//         payload
//     }
// }

// const updateProductReq = (data:any, id:any) =>{
//     return{
//         type: ActionTypes.UPDATE_PRODUCT,
//         payload: {data, id}
//     }
// }

// const updateProductRes = (payload:any) =>{
//     return{
//         type: ActionTypes.UPDATE_PRODUCT_RES,
//         payload
//     }
// }

// const deleteProductReq = (payload:any) =>{
//     return{
//         type: ActionTypes.DEL_PRODUCT,
//         payload
//     }
// }

// const deleteProductRes = (payload:any) =>{
//     return{
//         type: ActionTypes.DEL_PRODUCT_RES,
//         payload
//     }
// }

// const getAllCategoryReq = () =>{
//     return{
//         type: ActionTypes.GET_CATEGORY,
//     }
// }

// const getAllCategoryRes = (payload:any) =>{
//     return{
//         type: ActionTypes.GET_CATEGORY_RES,
//         payload
//     }
// }

// const loginReq = (payload:any) =>{
//     return{
//         type: ActionTypes.REQ_LOGIN,
//         payload
//     }
// }

// const loginRes = (payload:any) =>{
//     return{
//         type: ActionTypes.RES_LOGIN,
//         payload
//     }
// }

// export {
//     //USER
//     getAllUserReq,
//     getAllUserRes,
//     addCustomerReq,
//     addCustomerRes,
//     updateCustomerReq,
//     updateCustomerRes,
//     deleteUserReq,
//     deleteUserRes,
//     updatePasswordReq,
//     updatePasswordRes,
//     //PRODUCT
//     getAllProductReq,
//     getAllProductRes,
//     getProductByIdReq,
//     getProductByIdRes,
//     addProductReq,
//     addProductRes,
//     updateProductReq,
//     updateProductRes,
//     deleteProductReq,
//     deleteProductRes,
//     //CATEGORY
//     getAllCategoryReq,
//     getAllCategoryRes,
//     //LOGIN
//     loginReq,
//     loginRes
// }