import ActionType from "../actions/actionType";

const initialState ={
    category: [],
    message : '',
    status : '',
    refresh: '',
}


export default function CatReduce(state = initialState, action :any) {
        const {type , payload} = action;
        console.log('payload REDUCER',payload)
        switch (type) {
            case ActionType.GET_CAT_RESPONSE:
            return {state , category:payload ,status:payload.status, refresh:true};
            case ActionType.CREATE_CAT_RESPONSE:
            return {state  , refresh:false};
            case ActionType.UPDATE_CAT_RESPONSE:
            return {state  , refresh:false};
            case ActionType.DELETE_CAT_RESPONSE:
            return {state , refresh:false};
            default:
                return state;
            }
}