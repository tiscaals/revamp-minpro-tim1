import ActionTypes from "./actionType";

const getAllBatchesReq = () => {
    return{
        type: ActionTypes.REQ_GET_BATCHES,
    }
}
const getAllBatchesRes = (payload:any) => {
    return{
        type: ActionTypes.RES_GET_BATCHES,
        payload
    }
}

const getAllTrainersReq = () => {
    return{
        type: ActionTypes.REQ_GET_TRAINERS,
    }
}

const getAllTrainersRes = (payload:any) => {
    return{
        type: ActionTypes.RES_GET_TRAINERS,
        payload
    }
}

const getAllProgramsReq = () => {
    return{
        type: ActionTypes.REQ_GET_PROGRAMS,
    }
}
const getAllProgramsRes = (payload:any) => {
    return{
        type: ActionTypes.RES_GET_PROGRAMS,
        payload
    }
}

const addBatchReq = (payload:any) =>{
    return{
        type: ActionTypes.REQ_CREATE_BATCH,
        payload
    }
}

const addBatchRes = (payload:any) =>{
    return{
        type: ActionTypes.RES_CREATE_BATCH,
        payload
    }
}



export {
    getAllBatchesReq,
    getAllBatchesRes,
    addBatchReq,
    addBatchRes,
    getAllProgramsReq,
    getAllProgramsRes,
    getAllTrainersReq,
    getAllTrainersRes
}

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