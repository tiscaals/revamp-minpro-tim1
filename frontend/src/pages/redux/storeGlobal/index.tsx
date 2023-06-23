import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { combineReducers } from "redux";
import rootSaga from "../sagaGlobal";

import JobPostReducers from "../jobhire-schema/reducer/jobPostReducer";
import ClientReducers from "../jobhire-schema/reducer/clientReducer";
import TalentReducers from "../jobhire-schema/reducer/talentReducer";
import EducationReducers from "../master-schema/reducer/educationReducer";
import IndustryReducers from "../master-schema/reducer/industryReducer";
import JobroleReducers from "../master-schema/reducer/jobroleReducer";
import WorktypeReducers from "../master-schema/reducer/worktypeReducer";
import EmprangeReducers from "../jobhire-schema/reducer/emprangeReducer";
import CityReducers from "../master-schema/reducer/cityReducer";
import RouteactionReducers from "../master-schema/reducer/routeactionReducer";
import batchReducers from "../bootcamp-schema/reducer/batchReducer";
import trainerReducers from "../bootcamp-schema/reducer/trainerReducer";
import programReducers from "../bootcamp-schema/reducer/programReducer";
import talentsReducers from "../bootcamp-schema/reducer/talentsReducer";
import studentReducers from "../bootcamp-schema/reducer/studentsReducer";
import routeReducers from "../bootcamp-schema/reducer/routeReducer";
import candidateReducers from "../bootcamp-schema/reducer/candidateReducer";
import traineeReducers from "../bootcamp-schema/reducer/traineeReducer";
import evalReducers from "../bootcamp-schema/reducer/evaluationReducer";

const logger = createLogger();
const saga = createSagaMiddleware();

const reducer = combineReducers({
    JobPostReducers,
    ClientReducers,
    TalentReducers,
    EducationReducers,
    WorktypeReducers,
    JobroleReducers,
    IndustryReducers,
    EmprangeReducers,
    CityReducers,
    RouteactionReducers,

    //BOOTCAMP
    batchReducers,
    trainerReducers,
    programReducers,
    talentsReducers,
    studentReducers,
    routeReducers,
    candidateReducers,
    traineeReducers,
    evalReducers,
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