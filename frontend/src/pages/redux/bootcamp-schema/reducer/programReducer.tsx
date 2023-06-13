import ActionTypes from "../action/actionType";

const initialState = {
    message: '',
    status: 0,
    refresh: '',
    programs: []
}

function programReducers(state = initialState, action: any) {
    const {type, payload} = action;
    switch (type){
        case ActionTypes.RES_GET_PROGRAMS:
            return {state, programs: payload.data, refresh:true}
        default:
            return state
    }
}

export default programReducers
