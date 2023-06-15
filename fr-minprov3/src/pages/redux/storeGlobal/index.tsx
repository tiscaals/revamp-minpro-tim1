import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { combineReducers } from "redux";
import rootSaga from "../sagaGlobal";
import JobPostReducers from "../JobhireSchema/reducer/JobPostReducer";
import ClientReducers from "../JobhireSchema/reducer/ClientReducer";
import EducationReducers from "../MasterSchema/reducer/educationReducer";
import IndustryReducers from "../MasterSchema/reducer/industryReducer";
import JobroleReducers from "../MasterSchema/reducer/jobroleReducer";
import WorktypeReducers from "../MasterSchema/reducer/worktypeReducer";
import EmprangeReducers from "../JobhireSchema/reducer/EmprangeReducer";
import CityReducers from "../MasterSchema/reducer/cityReducer";


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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga);
export default store;