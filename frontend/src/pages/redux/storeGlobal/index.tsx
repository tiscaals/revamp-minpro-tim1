import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from '../sagaGlobal/index'
import curriculumReducers from "../curriculum-schema/reducer/curriculumReducer";
import CategoryReducers from "../master-schema/reducers/masterReducers";
import UsersReducers from "../users-schema/reducer/usersReducer";
import SectionReducers from "../curriculum-schema/reducer/sectionReducers";
import SectionUpReducers from "../curriculum-schema/reducer/sectUpReducers"
import getAllReducers from "../curriculum-schema/reducer/Allreducers"
import InstructorReducers from "../curriculum-schema/reducer/instructorReducers"

const logger = createLogger()
const saga = createSagaMiddleware()

const reducer = combineReducers({
    curriculumReducers,
    CategoryReducers,
    UsersReducers,
    SectionReducers,
    SectionUpReducers,
    getAllReducers,
    InstructorReducers
})

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(logger).concat(saga)
})

saga.run(rootSaga)

export default store