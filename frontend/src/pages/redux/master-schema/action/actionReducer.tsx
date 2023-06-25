import ActionType from "./actionType";

const getAllCategory = () =>{
    return{
        type: ActionType.GET_CATEGORY
    }
}

const getAllCategoryRes = (categories:any) =>{
    return{
        type: ActionType.GET_CATEGORY_RES,
        categories
    }
}

export {getAllCategory, getAllCategoryRes}