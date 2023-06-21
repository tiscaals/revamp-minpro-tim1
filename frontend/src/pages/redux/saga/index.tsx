import { takeEvery,all } from "redux-saga/effects";
import ActionTypes from "../action/actionType";
import { handleAddOrder, handleDelCart, handleGetAllCart, handleGetDiskon, handleGetPayment } from "./salesSaga";

function* watchAll() {
    yield all([
        takeEvery(ActionTypes.GET_CART, handleGetAllCart),
        takeEvery(ActionTypes.DEL_CART, handleDelCart),
        takeEvery(ActionTypes.GET_DISKON, handleGetDiskon),
        takeEvery(ActionTypes.ADD_ORDER, handleAddOrder),
        takeEvery(ActionTypes.GET_PAYMENT, handleGetPayment),
    ])
}

export default watchAll

// import ActionTypes from "../action/actionType";
// import { handleAddUser, handleDeleteUser, handleGetAllUser, handleUpdatePassword, handleUpdateUser } from "./userSaga";
// import { handleAddProduct, handleDeleteProduct, handleGetAllProduct, handleGetProductById, handleUpdateProduct } from "./productSaga";
// import { handleGetAllCategories } from "./categorySaga";
// import { handleLogin } from "./loginSaga";

// function* watchAll(){
//     yield all([
//         //USER
//         takeEvery(ActionTypes.GET_USERS, handleGetAllUser),
//         takeEvery(ActionTypes.ADD_USER, handleAddUser),
//         takeEvery(ActionTypes.UPDATE_USER, handleUpdateUser),
//         takeEvery(ActionTypes.DEL_USER, handleDeleteUser),
//         takeEvery(ActionTypes.UPDATE_PASSWORD, handleUpdatePassword),
//         //PRODUCT
//         takeEvery(ActionTypes.GET_PRODUCT, handleGetAllProduct),
//         takeEvery(ActionTypes.GET_PRODUCT_ID, handleGetProductById),
//         takeEvery(ActionTypes.ADD_PRODUCT, handleAddProduct),
//         takeEvery(ActionTypes.UPDATE_PRODUCT, handleUpdateProduct),
//         takeEvery(ActionTypes.DEL_PRODUCT, handleDeleteProduct),
//         //CATEGORY
//         takeEvery(ActionTypes.GET_CATEGORY, handleGetAllCategories),
//         //LOGIN
//         takeEvery(ActionTypes.REQ_LOGIN, handleLogin)
//     ])
// }

// export default watchAll;