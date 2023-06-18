import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { combineReducers } from "redux";
import rootSaga from "../sagaGlobal";

import JobPostReducers from "../jobhire-schema/reducer/jobPostReducer";
import ClientReducers from "../jobhire-schema/reducer/clientReducer";
import EducationReducers from "../master-schema/reducer/educationReducer";
import IndustryReducers from "../master-schema/reducer/industryReducer";
import JobroleReducers from "../master-schema/reducer/jobroleReducer";
import WorktypeReducers from "../master-schema/reducer/worktypeReducer";
import EmprangeReducers from "../jobhire-schema/reducer/emprangeReducer";
import CityReducers from "../master-schema/reducer/cityReducer";


const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({
    JobPostReducers,
    ClientReducers,
    EducationReducers,
    WorktypeReducers,
    JobroleReducers,
    IndustryReducers,
    EmprangeReducers,
    CityReducers
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware:any) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga);
export default store;