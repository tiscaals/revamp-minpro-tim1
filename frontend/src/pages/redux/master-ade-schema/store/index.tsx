import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {createLogger} from 'redux-logger'
import watchAll from "../saga";
import CatReduce from "../reducer/categoryReduce";
import SkillTempeleteReduce from "../reducer/skillTempleteReduce";
import SkillTypeReduce from "../reducer/skilltypeReduce";
import ModulesReduce from "../reducer/modulesReduce";
import AddressTypeReduce from "../reducer/addressTypeReduce";
import routeActionsReduce from "../reducer/routeActionsReducer";
import CountryReduce from "../reducer/countryReducer";
import ProvReduce from "../reducer/provReducer";
import CityReduce from "../reducer/cityReducer";

const logger = createLogger()
const saga = createSagaMiddleware()

const reducer = combineReducers({
    catReducer : CatReduce,
    skillTempeleteReducer : SkillTempeleteReduce,
    skillTypeReducer : SkillTypeReduce,
    modulesReducer : ModulesReduce,
    addressTypeReducer : AddressTypeReduce,
    routeActionsReducer : routeActionsReduce,
    countryReducer : CountryReduce,
    provReducer : ProvReduce,
    cityReducer : CityReduce


})

const Store =configureStore({
    reducer,
    middleware: (getDefaultMiddleware :any)=>
    getDefaultMiddleware({
        serializableCheck : false,
    }).concat(logger).concat(saga)
})

saga.run(watchAll)
export default Store