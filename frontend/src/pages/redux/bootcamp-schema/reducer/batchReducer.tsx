import ActionTypes from "../action/actionType";

const initialState = {
    batches: [],
    message: '',
    status: 0,
    refresh: '',
    programs: '',
    trainers: ''
}

function batchReducers(state = initialState, action: any) {
    const {type, payload} = action;
    switch (type){
        case ActionTypes.RES_GET_BATCHES:
            return {state, batches: payload.data, refresh:true}

        case ActionTypes.RES_GET_PROGRAMS:
            return {state, programs: payload.data, refresh:true}

        case ActionTypes.RES_GET_TRAINERS:
            return {state, trainers: payload.data, refresh:true}

        case ActionTypes.RES_CREATE_BATCH:
            return {message:payload.message, status: payload.status, refresh:false}
        default:
            return state
    }
}

export default batchReducers
