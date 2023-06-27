import ActionTypeJobHire from '../../redux/jobhire-schema/action/actionType';
import ActionTypeMaster from '../../redux/master-schema/action/actionType';
import ActionTypesPayment from '../../../pages/redux/payment/action/actionType';
import ActionTypesAde from '../../../pages/redux/master-ade-schema/actions/actionType'
import { takeEvery, all } from 'redux-saga/effects';
import {
  handleAddJobPost,
  handleDeleteJobPost,
  handleGetAllJobPost,
  handleGetCurnumber,
  handleGetJobById,
  handleGetJopho,
  handleGetSearchJobPost,
  handleUpdateJobPost,
  handleUpdateStatus,
} from '../jobhire-schema/saga/jobpostSaga';
import {
  handleAddClient,
  handleGetAllClient,
  handleGetClientById,
  handleUpdateClient,
} from '../jobhire-schema/saga/clientsaga';
import {
  handleCreateProCandidate,
  handleGetProCandidate,
  handleUpdateCandidate,
} from '../jobhire-schema/saga/talentSaga';
import { handleGetEducation } from '../master-schema/saga/educationSaga';
import { handleGetWorktype } from '../master-schema/saga/worktypeSaga';
import { handleGetJobrole } from '../master-schema/saga/jobroleSaga';
import { handleGetIndustry } from '../master-schema/saga/industrySaga';
import { handleGetEmprange } from '../jobhire-schema/saga/emprangeSaga';
import { handleGetRoac } from '../master-schema/saga/routeactionSaga';
import ActionTypes from '../bootcamp-schema/action/actionType';
import {
  handleAddBatch,
  handleAddEvaluation,
  handleDelete,
  handleEditBatch,
  handleEditParog,
  handleEditPrap,
  handleGetAllBatches,
  handleGetAllCandidates,
  handleGetAllPrograms,
  handleGetAllRecStudents,
  handleGetAllRoutes,
  handleGetAllTalents,
  handleGetAllTraineesByBatch,
  handleGetAllTrainers,
  handleGetOneBatches,
  handleGetPrapUser,
  handleUpdateChangeStatusBatch,
  handleUpdateChangeStatusTrainee,
} from '../bootcamp-schema/saga/batchsaga';
import {
  handleAddCart,
  handleAddOrder,
  handleDelCart,
  handleGetAllCart,
  handleGetDiskon,
  handleGetPayment,
} from '../sales-schema/saga/salesSaga';

import ActionTypesSales from '../sales-schema/action/actionType';
import ActionTypeCurr from '../curriculum-schema/action/actionType';
//Action Users
import ActionTypesUsers from '../users-schema/action/actionType';
import { handleAuthLogin } from '../users-schema/saga/auth-saga/authLoginSaga';
import { handleAuthSignUp } from '../users-schema/saga/auth-saga/authSignUpSaga';
import {
  handleAddAddress,
  handleUpdateAddress,
  handleDeleteAddress,
  handleGetAddressType,
  handleGetCity,
} from '../users-schema/saga/user-saga/addressSaga';
import {
  handleApplyJobs,
  handleApplyBootcamp,
} from '../users-schema/saga/user-saga/applySaga';
import {
  handleAddEducation,
  handleEditEducation,
  handleDeleteEducation,
} from '../users-schema/saga/user-saga/educationSaga';
import {
  handleAddEmail,
  handleEditEmail,
  handleDeleteEmail,
} from '../users-schema/saga/user-saga/emailSaga';
import {
  handleAddExperiences,
  handleEditExperiences,
  handleDeleteExperiences,
} from '../users-schema/saga/user-saga/experiencesSaga';
import {
  handleAddPhoneNumber,
  handleEditPhoneNumber,
  handleDeletePhoneNumber,
} from '../users-schema/saga/user-saga/phoneSaga';
import {
  handleGetRole,
  handleUpdateRole,
} from '../users-schema/saga/user-saga/roleSaga';
import {
  handleGetSkill,
  handleAddSkills,
  handleDeleteSkills,
} from '../users-schema/saga/user-saga/skillsSaga';
import {
  handleGetAllUser,
  handleGetProfile,
  handleEditProfile,
  handleEditPassword,
} from '../users-schema/saga/user-saga/userSaga';
import {
  handleAddAllCurr,
  handleAddSections,
  handleAddSectionsDetail,
  handleGetAll,
  handleGetAllCurr,
  handleGetCurr,
  handleGetCurrById,
  handleGetInstructor,
  handleUpdateProgram,
  handleViewSectionMerge,
  handleViewSectionMergeUp,
} from '../curriculum-schema/saga/curriculumSaga';
//End Action Saga

//placement
import ActionTypesHr from '../hr-schema/action/actionType'
import { handleAccountManager, handleGetEmployee, handleGetTalents, handleJobType, handleSearchClient, handleTalentsEmployee } from "../hr-schema/saga/hrSaga";
import { handleCreateEmployee, handleDepartment, handleGetTalentsJob, handleMasterJoRo, handleSearchEmp, handleUpdateEmployee, handleUsersRoles, handledeptHistory, handlefindEmployee, handlesalHistory } from "../hr-schema/saga/empSaga";


//Payment
import { handleAddBank, handleDeleteBank, handleUpdateBank, handlegetAllBank } from '../payment/saga/bankSaga';
import { handleAddFintech, handleDeleteFintech, handleUpdateFintech, handlegetAllFintech } from '../payment/saga/fintechSaga';
import { handleDeleteUsersAccount, handleUpdateUsersAccount, handleaddUserAccount, handlegetAllUsersAccount } from '../payment/saga/usersAccountSaga';
import { handlegetTOPUP } from '../payment/saga/topupSaga';
import { handlegetAllTransaction } from '../payment/saga/transactionSaga';
import { handleCreateCat, handleDelCat, handleGetCat, handleupdateCat } from '../master-ade-schema/saga/catSaga';
import { handleCreateSkillType, handleDelSkillType, handleGeSkillType, handleUpdateSkillType } from '../master-ade-schema/saga/skillType';
import { handleCreateSkillTemplete, handleDelSkillTemplete, handleGetSkillTemplete, handleUpdateSkillTemplete } from '../master-ade-schema/saga/skillTempeleteSaga';
import { handleCreateModule, handleDelModule, handleGetModule, handleUpdateModule } from '../master-ade-schema/saga/modulesSaga';
import { handleCreateAddressType, handleDelAddressType, handleUpdateAddressType } from '../master-ade-schema/saga/addressTypeSaga';
import { handleCreateRouteActions, handleDelRouteActions, handleGetRouteActions, handleUpdateDisplayRouteActions, handleUpdateRouteActions } from '../master-ade-schema/saga/routeActionsReduce';
import { handleCreateCountry, handleDelCountry, handleGetCountry, handleUpdateCountry } from '../master-ade-schema/saga/countrySaga';
import { handleCreateProv, handleDelProv, handleGetProv, handleUpdateProv } from '../master-ade-schema/saga/provSaga';
import { handleCreateCity, handleDelCity, handleUpdateCity } from '../master-ade-schema/saga/citySaga';

function* watchAll() {
  yield all([
    // Auth
    takeEvery(ActionTypesUsers.REQ_GET_LOGIN, handleAuthLogin),
    takeEvery(ActionTypesUsers.REQ_GET_SIGNUP, handleAuthSignUp),

    //User
    takeEvery(ActionTypesUsers.REQ_GET_USER, handleGetAllUser),

    //Role
    takeEvery(ActionTypesUsers.REQ_GET_ROLE, handleGetRole),
    takeEvery(ActionTypesUsers.REQ_UPDATE_ROLE, handleUpdateRole),

    //Profile-Setting
    takeEvery(ActionTypesUsers.REQ_GET_PROFILE, handleGetProfile),
    takeEvery(ActionTypesUsers.REQ_UPDATE_PROFILE, handleEditProfile),
    takeEvery(ActionTypesUsers.REQ_UPDATE_PASSWORD, handleEditPassword),

    //Profile-Email
    takeEvery(ActionTypesUsers.REQ_ADD_EMAIL, handleAddEmail),
    takeEvery(ActionTypesUsers.REQ_UPDATE_EMAIL, handleEditEmail),
    takeEvery(ActionTypesUsers.REQ_DELETE_EMAIL, handleDeleteEmail),

    //Phone-Number
    takeEvery(ActionTypesUsers.REQ_ADD_PHONE, handleAddPhoneNumber),
    takeEvery(ActionTypesUsers.REQ_UPDATE_PHONE, handleEditPhoneNumber),
    takeEvery(ActionTypesUsers.REQ_DELETE_PHONE, handleDeletePhoneNumber),

    //Address
    takeEvery(ActionTypesUsers.REQ_GET_ADDRESS_TYPE, handleGetAddressType),
    takeEvery(ActionTypesUsers.REQ_GET_CITY, handleGetCity),
    takeEvery(ActionTypesUsers.REQ_ADD_ADDRESS, handleAddAddress),
    takeEvery(ActionTypesUsers.REQ_UPDATE_ADDRESS, handleUpdateAddress),
    takeEvery(ActionTypesUsers.REQ_DELETE_ADDRESS, handleDeleteAddress),

    //Education
    takeEvery(ActionTypesUsers.REQ_ADD_EDUCATION, handleAddEducation),
    takeEvery(ActionTypesUsers.REQ_UPDATE_EDUCATION, handleEditEducation),
    takeEvery(ActionTypesUsers.REQ_DELETE_EDUCATION, handleDeleteEducation),

    //Experiences
    takeEvery(ActionTypesUsers.REQ_ADD_EXPERIENCES, handleAddExperiences),
    takeEvery(ActionTypesUsers.REQ_UPDATE_EXPERIENCES, handleEditExperiences),
    takeEvery(ActionTypesUsers.REQ_DELETE_EXPERIENCES, handleDeleteExperiences),

    //Skills
    takeEvery(ActionTypesUsers.REQ_GET_SKILL, handleGetSkill),
    takeEvery(ActionTypesUsers.REQ_ADD_SKILL, handleAddSkills),
    takeEvery(ActionTypesUsers.REQ_DELETE_SKILL, handleDeleteSkills),

    //Apply
    takeEvery(ActionTypesUsers.REQ_APPLY_JOB, handleApplyJobs),

    //Apply Bootcamp
    takeEvery(ActionTypesUsers.REQ_APPLY_BOOTCAMP, handleApplyBootcamp),

    takeEvery(ActionTypeJobHire.REQ_GET_JOBPOST, handleGetAllJobPost),
    takeEvery(ActionTypeJobHire.REQ_GET_JOBPHOTO, handleGetJopho),
    takeEvery(ActionTypeJobHire.REQ_GET_JOBBYID, handleGetJobById),
    takeEvery(ActionTypeJobHire.REQ_GET_CURNUMBER, handleGetCurnumber),
    takeEvery(ActionTypeJobHire.REQ_ADD_JOBPOST, handleAddJobPost),
    takeEvery(ActionTypeJobHire.REQ_UPDATE_JOBPOST, handleUpdateJobPost),
    takeEvery(ActionTypeJobHire.REQ_DELETE_JOBPOST, handleDeleteJobPost),
    takeEvery(ActionTypeJobHire.REQ_UPDATE_STATUS, handleUpdateStatus),
    takeEvery(ActionTypeJobHire.REQ_SEARCH_JOBPOST, handleGetSearchJobPost),

    takeEvery(ActionTypeJobHire.REQ_GET_EMPRANGE, handleGetEmprange),

    takeEvery(ActionTypeJobHire.REQ_ADD_PROCANDIDATE, handleCreateProCandidate),
    takeEvery(ActionTypeJobHire.REQ_GET_CANDIDATE, handleGetProCandidate),
    takeEvery(ActionTypeJobHire.REQ_UPDATE_CANDIDATE, handleUpdateCandidate),

    takeEvery(ActionTypeJobHire.REQ_GET_CLIENT, handleGetAllClient),
    takeEvery(ActionTypeJobHire.REQ_GET_CLIENTBYID, handleGetClientById),
    takeEvery(ActionTypeJobHire.REQ_ADD_CLIENT, handleAddClient),
    takeEvery(ActionTypeJobHire.REQ_UPDATE_CLIENT, handleUpdateClient),

    takeEvery(ActionTypeMaster.REQ_GET_EDUCATION, handleGetEducation),
    takeEvery(ActionTypeMaster.REQ_GET_WORKTYPE, handleGetWorktype),
    takeEvery(ActionTypeMaster.REQ_GET_JOBROLE, handleGetJobrole),
    takeEvery(ActionTypeMaster.REQ_GET_INDUSTRY, handleGetIndustry),
    takeEvery(ActionTypeMaster.REQ_GET_CITY, handleGetCity),
    takeEvery(ActionTypeMaster.REQ_GET_ROAC, handleGetRoac),

    //BOOTCAMP
    takeEvery(ActionTypes.REQ_GET_BATCHES, handleGetAllBatches),
    takeEvery(ActionTypes.REQ_GET_BATCH, handleGetOneBatches),
    takeEvery(ActionTypes.REQ_CREATE_BATCH, handleAddBatch),
    takeEvery(ActionTypes.REQ_GET_PROGRAMS, handleGetAllPrograms),
    takeEvery(ActionTypes.REQ_GET_TRAINERS, handleGetAllTrainers),
    takeEvery(ActionTypes.REQ_GET_RECSTUDENTS, handleGetAllRecStudents),
    takeEvery(ActionTypes.REQ_DELETE_BATCH, handleDelete),
    takeEvery(ActionTypes.REQ_EDIT_BATCH, handleEditBatch),
    takeEvery(ActionTypes.REQ_GET_ROUTES, handleGetAllRoutes),
    takeEvery(ActionTypes.REQ_GET_CANDIDATES, handleGetAllCandidates),
    takeEvery(ActionTypes.REQ_UPDATE_PAROG, handleEditParog),
    takeEvery(ActionTypes.REQ_UPDATE_PRAP, handleEditPrap),
    takeEvery(ActionTypes.REQ_GET_TRAINEES_BATCH, handleGetAllTraineesByBatch),
    takeEvery(ActionTypes.REQ_GET_TALENTS, handleGetAllTalents),
    takeEvery(ActionTypes.REQ_CREATE_EVALUATION, handleAddEvaluation),
    takeEvery(
      ActionTypes.REQ_UPDATE_CHANGE_STATUS_BATCH,
      handleUpdateChangeStatusBatch
    ),
    takeEvery(ActionTypes.REQ_UPDATE_TRAINEE_STATUS, handleUpdateChangeStatusTrainee),
    takeEvery(ActionTypes.REQ_GET_PRAP_PAROG,handleGetPrapUser ),

    //SALES
    takeEvery(ActionTypesSales.GET_CART, handleGetAllCart),
    takeEvery(ActionTypesSales.ADD_CART, handleAddCart),
    takeEvery(ActionTypesSales.DEL_CART, handleDelCart),
    takeEvery(ActionTypesSales.GET_DISKON, handleGetDiskon),
    takeEvery(ActionTypesSales.ADD_ORDER, handleAddOrder),
    takeEvery(ActionTypesSales.GET_PAYMENT, handleGetPayment),

      // CURRICULUM
      takeEvery(ActionTypeCurr.GET_CURRICULUM, handleGetAllCurr),
      takeEvery(ActionTypeCurr.ADD_CURRICULUM, handleAddAllCurr),
      takeEvery(ActionTypeCurr.GET_CURRNUMBER, handleGetCurr),
      takeEvery(ActionTypeCurr.ADD_SECTION, handleAddSections),
      takeEvery(ActionTypeCurr.ADD_SECTION_DETAIL, handleAddSectionsDetail),
      takeEvery(ActionTypeCurr.UPDATE_CURRICULUM, handleUpdateProgram),
      takeEvery(ActionTypeCurr.GET_SECTION_UP, handleViewSectionMergeUp),
      takeEvery(ActionTypeCurr.GET_CURR_BY_ID, handleGetCurrById),
      takeEvery(ActionTypeCurr.GET_SECT_MERGE, handleViewSectionMerge),
      takeEvery(ActionTypeCurr.GET_ALL, handleGetAll),
      takeEvery(ActionTypeCurr.GET_INSTRUCTOR, handleGetInstructor),

      //placement
      takeEvery(ActionTypesHr.REQ_GET_EMPLOYEE, handleGetEmployee),
      takeEvery(ActionTypesHr.REQ_GET_SEARCH, handleSearchEmp),
      takeEvery(ActionTypesHr.REQ_GET_DEPARTMENT, handleDepartment),
      takeEvery(ActionTypesHr.REQ_GET_JOROMASTER, handleMasterJoRo),
      takeEvery(ActionTypesHr.REQ_GET_USERSROLES, handleUsersRoles),
      takeEvery(ActionTypesHr.REQ_GET_JOBTYPE, handleJobType),
      takeEvery(ActionTypesHr.REQ_GET_AM, handleAccountManager),
      takeEvery(ActionTypesHr.REQ_CREATE_DATA_EMPLOYEE, handleCreateEmployee),
      takeEvery(ActionTypesHr.REQ_UPDATE_EMPLOYEE, handleUpdateEmployee),
      takeEvery(ActionTypesHr.REQ_GET_TALENTS, handleGetTalents),
      takeEvery(ActionTypesHr.REQ_GET_TALENTS_JOB, handleGetTalentsJob),
      takeEvery(ActionTypesHr.REQ_SEARCH_CLIENT, handleSearchClient),
      takeEvery(ActionTypesHr.REQ_TALENTS_EMPLOYEE, handleTalentsEmployee),
      takeEvery(ActionTypesHr.REQ_FIND_EMPLOYEE, handlefindEmployee),
      takeEvery(ActionTypesHr.REQ_DEPT_HISTORY, handledeptHistory),
      takeEvery(ActionTypesHr.REQ_SALARY_HISTORY, handlesalHistory),

      //PAYMENT
      
      //Bank
      takeEvery(ActionTypesPayment.REQ_GET_BANK, handlegetAllBank),
    takeEvery(ActionTypesPayment.ADD_BANK, handleAddBank),
    takeEvery(ActionTypesPayment.UPDATE_BANK, handleUpdateBank),
    takeEvery(ActionTypesPayment.DELETE_BANK, handleDeleteBank),
    // takeEvery(ActionTypes.REG_GET_BANK_ID,handleGetBankById),

    //Fintech
    takeEvery(ActionTypesPayment.REQ_GET_FINTECH, handlegetAllFintech),
    takeEvery(ActionTypesPayment.ADD_FINTECH, handleAddFintech),
    takeEvery(ActionTypesPayment.UPDATE_FINTECH,handleUpdateFintech),
    takeEvery(ActionTypesPayment.DELETE_FINTECH,handleDeleteFintech),
    
    //UserAccount
    takeEvery(ActionTypesPayment.REQ_GET_ACCOUNT, handlegetAllUsersAccount),
    takeEvery(ActionTypesPayment.ADD_ACCOUNT, handleaddUserAccount),
    takeEvery(ActionTypesPayment.UPDATE_ACCOUNT,handleUpdateUsersAccount),
    takeEvery(ActionTypesPayment.DELETE_ACCOUNT,handleDeleteUsersAccount),

      //Top Up
    takeEvery(ActionTypesPayment.ADD_TOPUP,handlegetTOPUP),
    
      //Transaction
    takeEvery(ActionTypesPayment.REQ_GET_TRANSACTION,handlegetAllTransaction),
  
    
    // master
    takeEvery(ActionTypesAde.GET_CAT, handleGetCat),
    takeEvery(ActionTypesAde.SKILL_TYPE, handleGeSkillType),
    takeEvery(ActionTypesAde.UPDATE_CAT, handleupdateCat),
    takeEvery(ActionTypesAde.DELETE_CAT, handleDelCat),
    takeEvery(ActionTypesAde.CREATE_CAT, handleCreateCat),
    takeEvery(ActionTypesAde.CREATE_SKILLTYPE, handleCreateSkillType),
    takeEvery(ActionTypesAde.DELETE_SKILLTYPE, handleDelSkillType),
    takeEvery(ActionTypesAde.UPDATE_SKILLTYPE, handleUpdateSkillType),

    takeEvery(ActionTypesAde.SKILL_TEMPLETE, handleGetSkillTemplete),
    takeEvery(ActionTypesAde.DEL_SKILL_TEMPLETE, handleDelSkillTemplete),
    takeEvery(ActionTypesAde.CREATE_SKILL_TEMPLETE, handleCreateSkillTemplete),
    takeEvery(ActionTypesAde.UPDATE_SKILL_TEMPLETE, handleUpdateSkillTemplete),

    takeEvery(ActionTypesAde.GET_MODULE, handleGetModule),
    takeEvery(ActionTypesAde.CREATE_MODULE, handleCreateModule),
    takeEvery(ActionTypesAde.DEL_MODULE, handleDelModule),
    takeEvery(ActionTypesAde.UPDATE_MODULE, handleUpdateModule),

    takeEvery(ActionTypesAde.GET_ADDRESSTYPE, handleGetAddressType),
    takeEvery(ActionTypesAde.CREATE_ADDTYPE, handleCreateAddressType),
    takeEvery(ActionTypesAde.DEL_ADDTYPE, handleDelAddressType),
    takeEvery(ActionTypesAde.UPDATE_ADDTYPE, handleUpdateAddressType),

    takeEvery(ActionTypesAde.GET_ROUTE_ACTIONS, handleGetRouteActions),
    takeEvery(ActionTypesAde.DEL_ROUTE_ACTIONS, handleDelRouteActions),
    takeEvery(ActionTypesAde.CREATE_ROUTE_ACTIONS, handleCreateRouteActions),
    takeEvery(ActionTypesAde.UPDATE_ROUTE_ACTIONS, handleUpdateRouteActions),
    takeEvery(
      ActionTypesAde.UPDATE_DISPLAY_ROUTE_ACTIONS,
      handleUpdateDisplayRouteActions
    ),

    takeEvery(ActionTypesAde.GET_COUNTRY, handleGetCountry),
    takeEvery(ActionTypesAde.DEL_COUNTRY, handleDelCountry),
    takeEvery(ActionTypesAde.CREATE_COUNTRY, handleCreateCountry),
    takeEvery(ActionTypesAde.UPDATE_COUNTRY, handleUpdateCountry),

    takeEvery(ActionTypesAde.GET_PROV, handleGetProv),
    takeEvery(ActionTypesAde.DEL_PROV, handleDelProv),
    takeEvery(ActionTypesAde.CREATE_PROV, handleCreateProv),
    takeEvery(ActionTypesAde.UPDATE_PROV, handleUpdateProv),

    takeEvery(ActionTypesAde.GET_CITY, handleGetCity),
    takeEvery(ActionTypesAde.DEL_CITY, handleDelCity),
    takeEvery(ActionTypesAde.CREATE_CITY, handleCreateCity),
    takeEvery(ActionTypesAde.UPDATE_CITY, handleUpdateCity),
  ]);
  }

  
  export default watchAll;