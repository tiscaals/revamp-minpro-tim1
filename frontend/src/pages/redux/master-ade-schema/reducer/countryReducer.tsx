import ActionTypes from "../actions/actionType";

const initialState={
    country : [],
    message : '',
    status : '',
    refreashCountry : '',
}

export default function CountryReduce(state = initialState , action : any){
const {type , payload} =action;
console.log('object', payload)
switch(type){
    case ActionTypes.GET_COUNTRY_RESPONSE:
        return{state, country:payload ,  refreashCountry:true};
    case ActionTypes.DEL_COUNTRY_RESPONSE:
        return{state,  refreashCountry:false};
    case ActionTypes.CREATE_COUNTRY_RESPONSE:
        return{state,  refreashCountry:false};
        case ActionTypes.UPDATE_COUNTRY_RESPONSE:
            return{state,  refreashCountry:false};
        default :
        return state
}
}