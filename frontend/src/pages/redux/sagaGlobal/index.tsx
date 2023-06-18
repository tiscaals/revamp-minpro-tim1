import ActionTypeJobHire from "../../redux/jobhire-schema/action/actionType";
import ActionTypeMaster from "../../redux/master-schema/action/actionType";

import { takeEvery, all} from "redux-saga/effects";
import { handleAddJobPost, handleDeleteJobPost, handleGetAllJobPost, handleGetCurnumber, handleGetJobById, handleGetJopho, handleUpdateJobPost } from "../jobhire-schema/saga/jobpostSaga";
import { handleAddClient, handleDeleteClient, handleGetAllClient, handleUpdateClient } from "../jobhire-schema/saga/clientsaga";
import { handleGetEducation } from "../master-schema/saga/educationSaga";
import { handleGetWorktype } from "../master-schema/saga/worktypeSaga";
import { handleGetJobrole } from "../master-schema/saga/jobroleSaga";
import { handleGetIndustry } from "../master-schema/saga/industrySaga";
import { handleGetEmprange } from "../jobhire-schema/saga/emprangeSaga";
import { handleGetCity } from "../master-schema/saga/citySaga";

function* watchAll() {
    yield all([
      takeEvery(ActionTypeJobHire.REQ_GET_JOBPOST, handleGetAllJobPost),
      takeEvery(ActionTypeJobHire.REQ_GET_JOBPHOTO, handleGetJopho),
      takeEvery(ActionTypeJobHire.REQ_GET_JOBBYID, handleGetJobById),
      takeEvery(ActionTypeJobHire.REQ_GET_CURNUMBER, handleGetCurnumber),
      takeEvery(ActionTypeJobHire.REQ_ADD_JOBPOST, handleAddJobPost),
      takeEvery(ActionTypeJobHire.REQ_UPDATE_JOBPOST, handleUpdateJobPost),
      takeEvery(ActionTypeJobHire.REQ_DELETE_JOBPOST, handleDeleteJobPost),

      takeEvery(ActionTypeJobHire.REQ_GET_EMPRANGE, handleGetEmprange),
  
      takeEvery(ActionTypeJobHire.REQ_GET_CLIENT, handleGetAllClient),
      takeEvery(ActionTypeJobHire.REQ_ADD_CLIENT, handleAddClient),
      takeEvery(ActionTypeJobHire.REQ_UPDATE_CLIENT, handleUpdateClient),
      takeEvery(ActionTypeJobHire.REQ_DELETE_CLIENT, handleDeleteClient),

      takeEvery(ActionTypeMaster.REQ_GET_EDUCATION, handleGetEducation),
      takeEvery(ActionTypeMaster.REQ_GET_WORKTYPE, handleGetWorktype),
      takeEvery(ActionTypeMaster.REQ_GET_JOBROLE, handleGetJobrole),
      takeEvery(ActionTypeMaster.REQ_GET_INDUSTRY, handleGetIndustry),
      takeEvery(ActionTypeMaster.REQ_GET_CITY, handleGetCity),
    

    ]);
  }
  
  export default watchAll;