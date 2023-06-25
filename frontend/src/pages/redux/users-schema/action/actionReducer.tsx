import ActionTypesUser from "./actionType";

const getUsers = () => {
    return{
        type: ActionTypesUser.GET_USERS
    }
}

const getUsersRes = (user:any) => {
    return{
        type: ActionTypesUser.GET_USERS_RES,
        user
    }
}

export {
    getUsers,
    getUsersRes
}