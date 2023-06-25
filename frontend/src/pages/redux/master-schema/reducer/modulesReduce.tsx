import ActionType from "../actions/actionType";

const initialState ={
    modules: [],
    message : '',
    status : '',
    refreshModules: '',
}


export default function ModulesReduce(state = initialState, action :any) {
        const {type , payload} = action;
        console.log(payload)
        switch (type) {
            case ActionType.GET_MODULE_RESPONSE:
            return {state , modules:payload , refreshModules:true};
            case ActionType.CREATE_MODULE_RESPONSE:
            return {state  , refreshModules:false};
            case ActionType.DEL_MODULE_RESPONSE:
            return {state  , refreshModules:false};
            case ActionType.UPDATE_MODULE_RESPONSE:
            return {state  , refreshModules:false};
            default:
                return state;
            }
}