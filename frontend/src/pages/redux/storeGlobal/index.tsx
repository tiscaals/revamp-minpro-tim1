import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import { combineReducers } from 'redux';
import rootSaga from '../sagaGlobal';

import JobPostReducers from '../jobhire-schema/reducer/jobPostReducer';
import ClientReducers from '../jobhire-schema/reducer/clientReducer';
import TalentReducers from '../jobhire-schema/reducer/talentReducer';
import EmprangeReducers from '../jobhire-schema/reducer/emprangeReducer';

import EducationReducers from '../master-schema/reducer/educationReducer';
import IndustryReducers from '../master-schema/reducer/industryReducer';
import JobroleReducers from '../master-schema/reducer/jobroleReducer';
import WorktypeReducers from '../master-schema/reducer/worktypeReducer';
import CityReducers from '../master-schema/reducer/cityReducer';
import RouteactionReducers from '../master-schema/reducer/routeactionReducer';

import batchReducers from '../bootcamp-schema/reducer/batchReducer';
import trainerReducers from '../bootcamp-schema/reducer/trainerReducer';
import programReducers from '../bootcamp-schema/reducer/programReducer';
import talentsReducers from '../bootcamp-schema/reducer/talentsReducer';
import studentReducers from '../bootcamp-schema/reducer/studentsReducer';
import routeReducers from '../bootcamp-schema/reducer/routeReducer';
import candidateReducers from '../bootcamp-schema/reducer/candidateReducer';
import traineeReducers from '../bootcamp-schema/reducer/traineeReducer';
import evalReducers from '../bootcamp-schema/reducer/evaluationReducer';

import salesReducers from '../sales-schema/reducer/salesReducer';
import orderReducers from '../sales-schema/reducer/orderReducers';
import diskonReducers from '../sales-schema/reducer/diskonReducer';
import paymentReducers from '../sales-schema/reducer/paymentReducer';

import userReducers from '../users-schema/reducer/user-reducer/userReducer';
import settingReducers from '../users-schema/reducer/user-reducer/settingReducer';
import authLoginReducers from '../users-schema/reducer/auth-reducer/authLoginReducer';
import { authSignUpReducers } from '../users-schema/reducer/auth-reducer/authSignUpReducer';
import addressTypeReducers from '../users-schema/reducer/user-reducer/addressTypeReducer';
import cityReducers from '../users-schema/reducer/user-reducer/cityReducers';
import rolesReducers from '../users-schema/reducer/user-reducer/roleReducer';
import skillsReducers from '../users-schema/reducer/user-reducer/skillsReducers';

import curriculumReducers from "../curriculum-schema/reducer/curriculumReducer"
import SectionReducers from "../curriculum-schema/reducer/sectionReducers"
import SectionUpReducers from "../curriculum-schema/reducer/sectUpReducers"
import InstructorReducers from "../curriculum-schema/reducer/instructorReducers"

import hrReducers from "../hr-schema/reducer/hrReducer";
import empReducers from "../hr-schema/reducer/empReducer";
import CatReduce from '../master-ade-schema/reducer/categoryReduce';
import SkillTempeleteReduce from '../master-ade-schema/reducer/skillTempleteReduce';
import SkillTypeReduce from '../master-ade-schema/reducer/skilltypeReduce';
import ModulesReduce from '../master-ade-schema/reducer/modulesReduce';
import AddressTypeReduce from '../master-ade-schema/reducer/addressTypeReduce';
import routeActionsReduce from '../master-ade-schema/reducer/routeActionsReducer';
import CountryReduce from '../master-ade-schema/reducer/countryReducer';
import ProvReduce from '../master-ade-schema/reducer/provReducer';
import CityReduce from '../master-ade-schema/reducer/cityReducer';
import bankReducer from '../payment/reducer/BankReducer';
import fintechReducer from '../payment/reducer/FintechReducer';
import AccountReducer from '../payment/reducer/AccountReducer';
import transactionReducer from '../payment/reducer/TransactionReducer';
import topupReducer from '../payment/reducer/TopupReducer';

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

  //SALES
  salesReducers,
  diskonReducers,
  orderReducers,
  paymentReducers,

  //MASTER
  CatReduce,
  SkillTempeleteReduce,
  SkillTypeReduce,
  ModulesReduce,
  AddressTypeReduce,
  routeActionsReduce,
  CountryReduce,
  ProvReduce,
  CityReduce,

  //USER
  userReducers,
  settingReducers,
  authLoginReducers,
  authSignUpReducers,
  addressTypeReducers,
  cityReducers,
  skillsReducers,
  rolesReducers,

  // curriculum
  curriculumReducers,
  SectionReducers,
  SectionUpReducers,
  InstructorReducers,

  //placement
  hrReducers,
  empReducers,

  //Payment
  bankReducer,
  fintechReducer,
  AccountReducer,
  transactionReducer,
  topupReducer,

});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga);
export default store;
