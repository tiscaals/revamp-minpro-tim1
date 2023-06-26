import ActionTypes from "../actions/actionType";

const initialState={
    routeActions : [],
    message : '',
    status : '',
    refreshRouteActions : '',
}

export default function routeActionsReduce(state = initialState , action : any){
const {type , payload} =action;
console.log('object', payload)
switch(type){
    case ActionTypes.GET_ROUTE_ACTIONS_RESPONSE:
        return{state, routeActions:payload ,  refreshRouteActions:true};
        case ActionTypes.DEL_ROUTE_ACTIONS_RESPONSE:
            return{state, refreshRouteActions:false};
        case ActionTypes.CREATE_ROUTE_ACTIONS_RESPONSE:
            return{state, refreshRouteActions:false};
        case ActionTypes.UPDATE_ROUTE_ACTIONS_RESPONSE:
            return{state, refreshRouteActions:false};
        case ActionTypes.UPDATE_DISPLAY_ROUTE_ACTIONS_RESPONSE:
            return{state, refreshRouteActions:false};
        default :
        return state
}
}