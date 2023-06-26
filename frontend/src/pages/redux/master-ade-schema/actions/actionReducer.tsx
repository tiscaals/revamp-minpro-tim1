import ActionTypes from "./actionType"

//CATEGORY

export const reqCat=()=>{
    return{
        type : ActionTypes.GET_CAT,
    }
}

export const resCat=(payload : any)=>{
    return{
        type : ActionTypes.GET_CAT_RESPONSE,
        payload
    }
}

export const reqUpdateCat=(payload : any)=>{
    console.log("PAYLOAD",payload)
    return{
        type : ActionTypes.UPDATE_CAT,
        payload,
    }
}

export const resUpdateCat=(payload : any)=>{
    
    return{
        type : ActionTypes.UPDATE_CAT_RESPONSE,
        payload
    }
}

export const reqDelCat=(payload : any)=>{
    console.log(payload)
    return{

        type : ActionTypes.DELETE_CAT,
        payload
    }
}

export const resDelCat=(data : any)=>{
    return{
        type : ActionTypes.DELETE_CAT_RESPONSE,
        data
    }
}

export const reqCreateCat=(payload : any)=>{
    console.log('action',payload)
    return{
        type : ActionTypes.CREATE_CAT,
        payload
    }
}

export const resCreateCat=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_CAT_RESPONSE,
        payload
    }
}


//skillType
export const reqSkillType=()=>{
    return{
        type : ActionTypes.SKILL_TYPE
    }
}

export const resSkillType=(payload : any)=>{
    console.log(payload)
    return{
        type : ActionTypes.SKILL_TYPE_RESPONSE,
        payload
    }
}

export const reqDelSkillType=(payload : any)=>{
    return{
        type : ActionTypes.DELETE_SKILLTYPE,
        payload
    }
}

export const resDelSkillType=(payload : any)=>{
    console.log(payload)
    return{
        type : ActionTypes.DELETE_SKILLTYPE_RESPONSE,
        payload
    }
}

export const reqCreateSkillType=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_SKILLTYPE,
        payload
    }
}

export const resCreateSkillType=(payload : any)=>{
    console.log(payload)
    return{
        type : ActionTypes.CREATE_SKILLTYPE_RESPONSE,
        payload
    }
}

export const reqUpdateSkillType = (payload : any )=>{
    return{
        type : ActionTypes.UPDATE_SKILLTYPE,
        payload
    }
}

export const resUpdateSkillType = (payload : any )=>{
    return{
        type : ActionTypes.UPDATE_SKILLTYPE_RESPONSE,
        payload
    }
}

//skill templete
export const reqSkillTemplete=()=>{
    return{
        type : ActionTypes.SKILL_TEMPLETE,
    }
}

export const resSkillTemplete=(payload : any)=>{
    return{
        type : ActionTypes.SKILL_TEMPLETE_RESPONSE,
        payload
    }
}
export const reqDelSkillTemplete=(payload : number)=>{
    return{
        type : ActionTypes.DEL_SKILL_TEMPLETE,
        payload
    }
}

export const resDelSkillTemplete=(payload : any)=>{
    return{
        type : ActionTypes.DEL_SKILL_TEMPLETE_RESPONSE,
        payload
    }
}

export const reqCreateSkillTemplete=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_SKILL_TEMPLETE,
        payload
    }
}

export const resCreateSkillTemplete=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_SKILL_TEMPLETE_RESPONSE,
        payload
    }
}

export const reqUpdateSkillTemplete=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_SKILL_TEMPLETE,
        payload
    }
}

export const resUpdateSkillTemplete=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_SKILL_TEMPLETE_RESPONSE,
        payload
    }
}


//module
export const reqGetModule=()=>{
    return{
        type : ActionTypes.GET_MODULE,
    }
}

export const resGetModule=(payload : any)=>{
    return{
        type : ActionTypes.GET_MODULE_RESPONSE,
        payload
    }
}

export const reqCreateModule=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_MODULE,
        payload
    }
}

export const resCreateModule=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_MODULE_RESPONSE,
        payload
    }
}

export const reqUpdateModule=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_MODULE,
        payload
    }
}

export const resUpdateModule=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_MODULE_RESPONSE,
        payload
    }
}
export const reqDelModule=(payload : any)=>{
    return{
        type : ActionTypes.DEL_MODULE,
        payload
    }
}

export const resDelModule=(payload : any)=>{
    return{
        type : ActionTypes.DEL_MODULE_RESPONSE,
        payload
    }
}



//ADDRESS-TYPE
export const reqGetAdressType=()=>{
    return{
        type : ActionTypes.GET_ADDRESSTYPE,
    }
}

export const resGetAddressType=(payload : any)=>{
    return{
        type : ActionTypes.GET_ADDRESSTYPE_RESPONSE,
        payload
    }
}

export const reqCreateAdressType=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_ADDTYPE,
        payload
    }
}

export const resCreateAddressType=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_ADDTYPE_RESPONSE,
        payload
    }
}

export const reqUpdateAdressType=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_ADDTYPE,
        payload
    }
}

export const resUpdateAddressType=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_ADDTYPE_RESPONSE,
        payload
    }
}

export const reqDelAdressType=(payload : any)=>{
    return{
        type : ActionTypes.DEL_ADDTYPE,
        payload
    }
}

export const resDelAddressType=(payload : any)=>{
    return{
        type : ActionTypes.DEL_ADDTYPE_RESPONSE,
        payload
    }
}

//route -actions
export const reqGetRouteAction=()=>{
    return{
        type : ActionTypes.GET_ROUTE_ACTIONS,
    }
}

export const resGetRouteActions=(payload : any)=>{
    return{
        type : ActionTypes.GET_ROUTE_ACTIONS_RESPONSE,
        payload
    }
}

export const reqDelRouteAction=(payload :number)=>{
    return{
        type : ActionTypes.DEL_ROUTE_ACTIONS,
        payload
    }
}

export const resDelRouteActions=(payload : any)=>{
    return{
        type : ActionTypes.DEL_ROUTE_ACTIONS_RESPONSE,
        payload
    }
}


export const reqCreateRouteAction=(payload :any)=>{
    return{
        type : ActionTypes.CREATE_ROUTE_ACTIONS,
        payload
    }
}

export const resCreateRouteActions=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_ROUTE_ACTIONS_RESPONSE,
        payload
    }
}

export const reqUpdateRouteAction=(payload :any)=>{
    return{
        type : ActionTypes.UPDATE_ROUTE_ACTIONS,
        payload
    }
}

export const resUpdateRouteActions=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_ROUTE_ACTIONS_RESPONSE,
        payload
    }
}

export const reqUpdateDisplayRouteAction=(payload :any)=>{
    console.log('ini',payload)
    return{
        type : ActionTypes.UPDATE_DISPLAY_ROUTE_ACTIONS,
        payload
    }
}

export const resUpdateDisplayRouteActions=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_DISPLAY_ROUTE_ACTIONS_RESPONSE,
        payload
    }
}

//country
export const reqGetCountry=()=>{
    return{
        type : ActionTypes.GET_COUNTRY,
    }
}


export const resGetCountry=(payload : any)=>{
    return{
        type : ActionTypes.GET_COUNTRY_RESPONSE,
        payload
    }
}

export const reqDelCountry=(payload : any)=>{
    return{
        type : ActionTypes.DEL_COUNTRY,
        payload
    }
}
export const resDelCountry =(payload : any)=>{
    return{
        type : ActionTypes.DEL_COUNTRY_RESPONSE,
        payload
    }
}
export const reqCreateCountry=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_COUNTRY,
        payload
    }
}
export const resCreateCountry =(payload : any)=>{
    return{
        type : ActionTypes.CREATE_COUNTRY_RESPONSE,
        payload
    }
}

export const reqUpdateCountry=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_COUNTRY,
        payload
    }
}
export const resUpdateCountry =(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_COUNTRY_RESPONSE,
        payload
    }
}

///PROVINCE
export const reqGetProv=()=>{
    return{
        type : ActionTypes.GET_PROV,
    }
}

export const resGetProv=(payload : any)=>{
    return{
        type : ActionTypes.GET_PROV_RESPONSE,
        payload
    }
}

export const reqDelProv=(payload : any)=>{
    return{
        type : ActionTypes.DEL_PROV,
        payload
    }
}

export const resDelProv=(payload : any)=>{
    return{
        type : ActionTypes.DEL_PROV_RESPONSE,
        payload
        
    }
}

export const reqCreateProv=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_PROV,
        payload
    }
}

export const resCreateProv=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_PROV_RESPONSE,
        payload
        
    }
}

export const reqUpdateProv=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_PROV,
        payload
    }
}

export const resUpdateProv=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_PROV_RESPONSE,
        payload
        
    }
}

//CITY
export const reqGetCity=()=>{
    return{
        type : ActionTypes.GET_CITY,
    }
}

export const resGetCity=(payload : any)=>{
    return{
        type : ActionTypes.GET_CITY_RESPONSE,
        payload
    }
}
export const reqDelCity=(payload : any)=>{
    console.log(payload)
    return{
        type : ActionTypes.DEL_CITY,
        payload
    }
}

export const resDelCity=(payload : any)=>{
    return{
        type : ActionTypes.DEL_CITY_RESPONSE,
        payload
        
    }
}

export const reqCreateCity=(payload : any)=>{
    console.log(payload)
    return{
        type : ActionTypes.CREATE_CITY,
        payload
    }
}

export const resCreateCity=(payload : any)=>{
    return{
        type : ActionTypes.CREATE_CITY_RESPONSE,
        payload
        
    }
}

export const reqUpdateCity=(payload : any)=>{
    console.log(payload)
    return{
        type : ActionTypes.UPDATE_CITY,
        payload
    }
}

export const resUpdateCity=(payload : any)=>{
    return{
        type : ActionTypes.UPDATE_CITY_RESPONSE,
        payload
        
    }
}