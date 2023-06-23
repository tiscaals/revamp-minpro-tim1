import ActionTypes from './actionType';

const getAllBatchesReq = () => {
  return {
    type: ActionTypes.REQ_GET_BATCHES,
  };
};

const getAllBatchesRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_BATCHES,
    payload,
  };
};

const getAllRoutesReq = () => {
  return {
    type: ActionTypes.REQ_GET_ROUTES,
  };
};

const getAllRoutesRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_ROUTES,
    payload,
  };
};

const getAllCandidatesReq = () => {
  return {
    type: ActionTypes.REQ_GET_CANDIDATES,
  };
};

const getAllCandidatesRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_CANDIDATES,
    payload,
  };
};

const getOneBatchesReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_BATCH,
    payload,
  };
};
const getOneBatchesRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_BATCH,
    payload,
  };
};

const getAllTrainersReq = () => {
  return {
    type: ActionTypes.REQ_GET_TRAINERS,
  };
};

const getAllTrainersRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_TRAINERS,
    payload,
  };
};

const getAllProgramsReq = () => {
  return {
    type: ActionTypes.REQ_GET_PROGRAMS,
  };
};
const getAllProgramsRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_PROGRAMS,
    payload,
  };
};

const getAllTalentsReq = () => {
  return {
    type: ActionTypes.REQ_GET_TALENTS,
  };
};
const getAllTalentsRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_TALENTS,
    payload,
  };
};

const getAllRecStudentReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_RECSTUDENTS,
    payload,
  };
};

const getAllRecStudentRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_RECSTUDENTS,
    payload,
  };
};

const UpdateCloseBatchReq = (payload:any) => {
    return{
        type: ActionTypes.REQ_UPDATE_CLOSE_BATCH,
        payload
    }
}

const UpdateCloseBatchRes = (payload:any) => {
    return{
        type: ActionTypes.RES_UPDATE_CLOSE_BATCH,
        payload
    }
}


const getAllTraineesByBatchReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_GET_TRAINEES_BATCH,
    payload,
  };
};

const getAllTraineesByBatchRes = (payload: any) => {
  return {
    type: ActionTypes.RES_GET_TRAINEES_BATCH,
    payload,
  };
};

const addBatchReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_CREATE_BATCH,
    payload,
  };
};

const addBatchRes = (payload: any) => {
  return {
    type: ActionTypes.RES_CREATE_BATCH,
    payload,
  };
};
const addEvalsReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_CREATE_EVALUATION,
    payload,
  };
};

const addEvalsRes = (payload: any) => {
  return {
    type: ActionTypes.RES_CREATE_EVALUATION,
    payload,
  };
};

const editReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_EDIT_BATCH,
    payload,
  };
};

const editRes = (payload: any) => {
  return {
    type: ActionTypes.RES_EDIT_BATCH,
    payload,
  };
};

const editParogReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_PAROG,
    payload,
  };
};

const editParogRes = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_PAROG,
    payload,
  };
};

const editPrapReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_PRAP,
    payload,
  };
};

const editPrapRes = (payload: any) => {
  return {
    type: ActionTypes.RES_UPDATE_PRAP,
    payload,
  };
};

const deleteBatchReq = (payload: any) => {
  return {
    type: ActionTypes.REQ_DELETE_BATCH,
    payload,
  };
};

const deleteBatchRes = (payload: any) => {
  return {
    type: ActionTypes.RES_DELETE_BATCH,
    payload,
  };
};

export {
  getAllBatchesReq,
  getAllBatchesRes,
  addBatchReq,
  addBatchRes,
  getAllProgramsReq,
  getAllProgramsRes,
  getAllTrainersReq,
  getAllTrainersRes,
  getAllRecStudentReq,
  getAllRecStudentRes,
  deleteBatchReq,
  deleteBatchRes,
  editReq,
  editRes,
  getOneBatchesReq,
  getOneBatchesRes,
  getAllRoutesReq,
  getAllRoutesRes,
  getAllCandidatesReq,
  getAllCandidatesRes,
  editParogReq,
  editParogRes,
  editPrapReq,
  editPrapRes,
  getAllTraineesByBatchReq,
  getAllTraineesByBatchRes,
  getAllTalentsReq,
  getAllTalentsRes,
  UpdateCloseBatchReq,
  UpdateCloseBatchRes,
  addEvalsReq,
  addEvalsRes
};
