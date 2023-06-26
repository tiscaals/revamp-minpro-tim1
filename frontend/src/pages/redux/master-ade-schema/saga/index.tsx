import {takeEvery , all} from 'redux-saga/effects'
import ActionTypes from '../actions/actionType'
import { handleCreateCat, handleDelCat, handleGetCat, handleupdateCat } from './catSaga'
import { handleCreateSkillType, handleDelSkillType, handleGeSkillType, handleUpdateSkillType } from './skillType'
import { handleCreateSkillTemplete, handleDelSkillTemplete, handleGetSkillTemplete, handleUpdateSkillTemplete } from './skillTempeleteSaga'
import { handleCreateModule, handleDelModule, handleGetModule, handleUpdateModule } from './modulesSaga'
import { handleCreateAddressType, handleDelAddressType, handleGetAddressType, handleUpdateAddressType } from './addressTypeSaga'
import { handleCreateRouteActions, handleDelRouteActions, handleGetRouteActions, handleUpdateDisplayRouteActions, handleUpdateRouteActions } from './routeActionsReduce'
import { handleCreateCountry, handleDelCountry, handleGetCountry, handleUpdateCountry } from './countrySaga'
import { handleCreateProv, handleDelProv, handleGetProv, handleUpdateProv } from './provSaga'
import { handleCreateCity, handleDelCity, handleGetCity, handleUpdateCity } from './citySaga'

function* watchAll(){
    yield all([
        takeEvery(ActionTypes.GET_CAT , handleGetCat),
        takeEvery(ActionTypes.SKILL_TYPE , handleGeSkillType),
        takeEvery(ActionTypes.UPDATE_CAT , handleupdateCat),
        takeEvery(ActionTypes.DELETE_CAT , handleDelCat),
        takeEvery(ActionTypes.CREATE_CAT , handleCreateCat),
        takeEvery(ActionTypes.CREATE_SKILLTYPE , handleCreateSkillType),
        takeEvery(ActionTypes.DELETE_SKILLTYPE , handleDelSkillType),
        takeEvery(ActionTypes.UPDATE_SKILLTYPE , handleUpdateSkillType),

        takeEvery(ActionTypes.SKILL_TEMPLETE , handleGetSkillTemplete),
        takeEvery(ActionTypes.DEL_SKILL_TEMPLETE , handleDelSkillTemplete),
        takeEvery(ActionTypes.CREATE_SKILL_TEMPLETE , handleCreateSkillTemplete),
        takeEvery(ActionTypes.UPDATE_SKILL_TEMPLETE , handleUpdateSkillTemplete),
        

        takeEvery(ActionTypes.GET_MODULE, handleGetModule),
        takeEvery(ActionTypes.CREATE_MODULE, handleCreateModule),
        takeEvery(ActionTypes.DEL_MODULE, handleDelModule),
        takeEvery(ActionTypes.UPDATE_MODULE, handleUpdateModule),



        takeEvery(ActionTypes.GET_ADDRESSTYPE , handleGetAddressType),
        takeEvery(ActionTypes.CREATE_ADDTYPE , handleCreateAddressType),
        takeEvery(ActionTypes.DEL_ADDTYPE , handleDelAddressType),
        takeEvery(ActionTypes.UPDATE_ADDTYPE , handleUpdateAddressType),

        takeEvery(ActionTypes.GET_ROUTE_ACTIONS , handleGetRouteActions),
        takeEvery(ActionTypes.DEL_ROUTE_ACTIONS , handleDelRouteActions),
        takeEvery(ActionTypes.CREATE_ROUTE_ACTIONS , handleCreateRouteActions),
        takeEvery(ActionTypes.UPDATE_ROUTE_ACTIONS , handleUpdateRouteActions),
        takeEvery(ActionTypes.UPDATE_DISPLAY_ROUTE_ACTIONS , handleUpdateDisplayRouteActions),

        takeEvery(ActionTypes.GET_COUNTRY , handleGetCountry),
        takeEvery(ActionTypes.DEL_COUNTRY , handleDelCountry),
        takeEvery(ActionTypes.CREATE_COUNTRY , handleCreateCountry),
        takeEvery(ActionTypes.UPDATE_COUNTRY , handleUpdateCountry),

        takeEvery(ActionTypes.GET_PROV , handleGetProv),
        takeEvery(ActionTypes.DEL_PROV , handleDelProv),
        takeEvery(ActionTypes.CREATE_PROV , handleCreateProv),
        takeEvery(ActionTypes.UPDATE_PROV , handleUpdateProv),

        takeEvery(ActionTypes.GET_CITY , handleGetCity),
        takeEvery(ActionTypes.DEL_CITY , handleDelCity),
        takeEvery(ActionTypes.CREATE_CITY , handleCreateCity),
        takeEvery(ActionTypes.UPDATE_CITY , handleUpdateCity),
        
    ])
}

export default watchAll