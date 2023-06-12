// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import UserReducers from "../jobhire-schema/reducer/userReducer";
// import ProductReducers from "../jobhire-schema/reducer/productReducer";
// import CategoryReducers from "../jobhire-schema/reducer/categoryReducer";
// import { combineReducers } from "redux";
// import { createLogger } from "redux-logger";
// import createSagaMiddleware from '@redux-saga/core'
// import rootSaga from '../saga/index'
// import LoginReducers from "../jobhire-schema/reducer/loginReducer";

// const logger = createLogger()
// const saga = createSagaMiddleware()

// const reducer = combineReducers({
//     UserReducers,
//     ProductReducers,
//     CategoryReducers,
//     LoginReducers
// })

// const store = configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({serializableCheck: false}).concat(logger).concat(saga)
// })

// saga.run(rootSaga)

// export default store