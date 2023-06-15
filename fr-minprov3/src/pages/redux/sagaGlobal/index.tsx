import ActionTypeJobHire from "../../redux/JobhireSchema/action/actiontype";
import ActionTypeMaster from "../../redux/MasterSchema/action/actionType";

import { takeEvery, all} from "redux-saga/effects";
import { handleAddJobPost, handleDeleteJobPost, handleGetAllJobPost, handleGetCurnumber, handleUpdateJobPost } from "../JobhireSchema/saga/jobpostSaga";
import { handleAddClient, handleDeleteClient, handleGetAllClient, handleUpdateClient } from "../JobhireSchema/saga/clientsaga";
import { handleGetEducation } from "../MasterSchema/saga/educationSaga";
import { handleGetWorktype } from "../MasterSchema/saga/worktypeSaga";
import { handleGetJobrole } from "../MasterSchema/saga/jobroleSaga";
import { handleGetIndustry } from "../MasterSchema/saga/industrySaga";
import { handleGetEmprange } from "../JobhireSchema/saga/emprangeSaga";
import { handleGetCity } from "../MasterSchema/saga/citySaga";

function* watchAll() {
    yield all([
      takeEvery(ActionTypeJobHire.REQ_GET_JOBPOST, handleGetAllJobPost),
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