import ActionType from "../actions/actionType";

const initialState ={
    city: [],
    message : '',
    status : '',
    refreshCity: '',
}


export default function CityReduce(state = initialState, action :any) {
        const {type , payload} = action;
        console.log(payload)
        switch (type) {
            case ActionType.GET_CITY_RESPONSE:
            return {state , city:payload ,status:payload.status, refreshCity:true};
            case ActionType.DEL_CITY_RESPONSE:
            return {state , refreshCity:false};
            case ActionType.CREATE_CITY_RESPONSE:
            return {state , refreshCity:false};
            case ActionType.UPDATE_CITY_RESPONSE:
            return {state , refreshCity:false};
            default:
                return state;
            }
}