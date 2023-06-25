import ActionType from "../actions/actionType";

const initialState ={
    addressType: [],
    message : '',
    status : '',
    refreshAddressType: '',
}


export default function AddressTypeReduce(state = initialState, action :any) {
        const {type , payload} = action;
        console.log(payload)
        switch (type) {
            case ActionType.GET_ADDRESSTYPE_RESPONSE:
            return {state , addressType:payload ,status:payload.status, refreshAddressType:true};
            case ActionType.CREATE_ADDTYPE_RESPONSE:
            return {state , refreshAddressType:false}; 
            case ActionType.DEL_ADDTYPE_RESPONSE:
            return {state , refreshAddressType:false}; 
            case ActionType.UPDATE_ADDTYPE_RESPONSE:
            return {state , refreshAddressType:false};  
            default:
                return state;
            }
}