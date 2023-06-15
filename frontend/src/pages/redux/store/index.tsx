import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from '../saga/index'
import salesReducers from "../reducer/salesReducer";


const logger = createLogger()
const saga = createSagaMiddleware()

const reducer = combineReducers({
    salesReducers
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(logger).concat(saga)
})

saga.run(rootSaga)

export default store