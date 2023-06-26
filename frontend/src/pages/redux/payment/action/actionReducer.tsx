import ActionTypesPayment from "./actionType";

//bank
export const doRequestGetBank = () =>{
    return {
        type:ActionTypesPayment.REQ_GET_BANK
    }
}

export const doGetBankResponse = (payload:any) =>{
    return {
        type:ActionTypesPayment.GET_BANK_RESPONE,
        payload
    }
}

export const doadd = (payload:any) =>{
    return {
        type:ActionTypesPayment.ADD_BANK,
        payload
    }
}

export const dobankResponse = (payload:any) => {
    return{
        type:ActionTypesPayment.ADD_BANK_RESPONSE,
        payload
    }
}

export const  doupdate = (payload:any) =>{
    // console.log("object");
    return{
        type:ActionTypesPayment.UPDATE_BANK,
        payload
    }
}

export const doBankUpdateResponse = (payload:any) => {
    // console.log("object");
    return{
        type:ActionTypesPayment.UPDATE_BANK_RESPONSE,
        payload
    }
}

export const doUpdateResponse = (payload:any) =>{
    // console.log("object");
   return{
    type:ActionTypesPayment.REG_GET_BANK_ID,
    payload
   }
  };

export const doReqBank = (payload:any) => {
    return {
        type:ActionTypesPayment.GET_BANK_ID_RESPONSE,
        payload
    }
}




export const dodeleteBank = (payload:any) => {
    return{
        type:ActionTypesPayment.DELETE_BANK,
        payload
    }
}

export const deleteBankResponse = (payload:any) => {
    return{
        type:ActionTypesPayment.DELETE_BANK_RESPONSE,
        payload
    }
}



//fintech
export const doRequestGetFintech = () =>{
    return {
        type:ActionTypesPayment.REQ_GET_FINTECH
    }
}

export const doGetFintechResponse = (payload:any) =>{
    return {
        type:ActionTypesPayment.GET_FINTECH_RESPONE,
        payload
    }
}

export const doAddFintech = (payload:any) => {
    return {
        type:ActionTypesPayment.ADD_FINTECH,
        payload
    }
}

export const doAddFintechResponse = (payload:any) => {
    return {
        type:ActionTypesPayment.ADD_FINTECH_RESPONSE,
        payload
    }
}

export const doUpdateFintech = (payload:any) => {
    return{
        type: ActionTypesPayment.UPDATE_FINTECH,
        payload
    }
}

export const doFintechUpdateResponse = (payload:any) => {
    return{
        type: ActionTypesPayment.UPDATE_FINTECH_RESPONSE,
        payload
    }
}

export const doDeleteFintech = (payload:any) => {
    return{
        type: ActionTypesPayment.DELETE_FINTECH,
        payload
    }
}

export const doDeleteFintechResponse = (payload:any) => {
    return{
        type: ActionTypesPayment.DELETE_FINTECH_RESPONSE,
        payload
    }
}

//account
export const doRequestGetUsersAccount = () =>{
    return {
        type:ActionTypesPayment.REQ_GET_ACCOUNT
    }
}

export const doGetUsersAccountResponse = (payload:any) =>{
    return {
        type:ActionTypesPayment.GET_ACCOUNT_RESPONE,
        payload
    }
}

export const doAddAccount = (payload:any) => {
    return {
        type:ActionTypesPayment.ADD_ACCOUNT,
        payload
    }
}

export const doAddAccountResponse = (payload:any) => {
    return {
        type: ActionTypesPayment.ADD_ACCOUNT_RESPONSE,
        payload
    }
}

export const doUpdateAccount = (payload:any) => {
    return {
        type:ActionTypesPayment.UPDATE_ACCOUNT,
        payload
    }
}

export const doUsersAccountUpdateResponse = (payload:any) => {
    return{
        type:ActionTypesPayment.UPDATE_ACCOUNT_RESPONSE,
        payload
    }
}

export const dodeleteUsersAccount = (payload:any) => {
    return{
        type:ActionTypesPayment.DELETE_ACCOUNT,
        payload
    }
}

export const deleteUsersAccountResponse = (payload:any) => {
    return{
        type:ActionTypesPayment.DELETE_ACCOUNT_RESPONSE,
        payload
    }
}


//TOPUP
export const doAddTOPUP = (payload:any) => {
    // console.log(payload,"wkaodkks");
    return {
        type:ActionTypesPayment.ADD_TOPUP,
        payload
    }
}

export const doAddTOPUPResponse = (payload:any) => {
    return {
        type: ActionTypesPayment.ADD_TOPUP_RESPONSE,
        payload
    }
}

//transaction
export const doRequestGetTRANSACTION = () =>{
    return {
        type:ActionTypesPayment.REQ_GET_TRANSACTION
    }
}

export const doGetTRANSACTIONResponse = (payload:any) =>{
    return {
        type:ActionTypesPayment.GET_TRANSACTION_RESPONE,
        payload
    }
}

