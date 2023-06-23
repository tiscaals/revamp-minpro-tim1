import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from '../sagaGlobal/index'
import curriculumReducers from "../curriculum-schema/reducer/curriculumReducer";
import CategoryReducers from "../master-schema/reducers/masterReducers";
import UsersReducers from "../users-schema/reducer/usersReducer";
import SectionReducers from "../curriculum-schema/reducer/sectionReducers";
import SectionDetailReducers from "../curriculum-schema/reducer/sectDetailReducers"

const logger = createLogger()
const saga = createSagaMiddleware()

const reducer = combineReducers({
    curriculumReducers,
    CategoryReducers,
    UsersReducers,
    SectionReducers,
    SectionDetailReducers
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(logger).concat(saga)
})

saga.run(rootSaga)

export default store