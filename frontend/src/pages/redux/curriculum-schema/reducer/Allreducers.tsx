import ActionTypes from '../action/actionType';

const initialState = {
    getAll:[],
    message:'',
    status:0,
    refreshAll:''
}

function getAllReducers(state = initialState, action :any){
    const {type, getAlls} = action
    console.log("reducers", getAlls);
    switch(type){
        case ActionTypes.GET_ALL_RES:
            return {state, getAll:getAlls, refreshAll:true };
        default :
            return state;
    }
}

export default getAllReducers;