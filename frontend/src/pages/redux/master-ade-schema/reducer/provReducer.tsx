import ActionType from "../actions/actionType";

const initialState ={
    prov: [],
    message : '',
    status : '',
    refreshProv: '',
}


export default function ProvReduce(state = initialState, action :any) {
        const {type , payload} = action;
        switch (type) {
            case ActionType.GET_PROV_RESPONSE:
            return {state , prov:payload ,status:payload.status, refreshProv:true};
            case ActionType.DEL_PROV_RESPONSE:
            return {state ,  refreshProv:false};
            case ActionType.CREATE_PROV_RESPONSE:
            return {state ,  refreshProv:false};
            case ActionType.UPDATE_PROV_RESPONSE:
            return {state ,  refreshProv:false};
            default:
                return state;
            }
}