import ActionTypes from "../action/actionType";

const initialState = {
    batches: [],
    message: '',
    status: 0,
    refresh: ''
}

function batchReducers(state = initialState, action: any) {
    const {type, payload} = action;
//     console.log('payload :',payload);
    switch (type){
        case ActionTypes.RES_GET_BATCHES:
            return {state, batches: payload.data, refresh:true}
//         case ActionTypes.ADD_USER_RES:
//             return {message:payload.message, status: payload.status, refresh:false}
//         case ActionTypes.UPDATE_USER_RES:
//             return {message:payload.message, status: payload.status, refresh:false}
//         case ActionTypes.DEL_USER_RES:
//             return {message:payload.message, status: payload.status, refresh:false}
//         case ActionTypes.UPDATE_PASSWORD_RES:
//             return {message:payload.message, status: payload.status, refresh:false}
        default:
            return state
    }
}

export default batchReducers
