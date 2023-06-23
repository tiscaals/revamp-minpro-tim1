import ActionTypes from './actionType';

// get view
const getAllCurrReq = () => {
  return {
    type: ActionTypes.GET_CURRICULUM,
  };
};

const getAllCurrRes = (payload: any) => {
  return {
    type: ActionTypes.GET_CURRICULUM_RES,
    payload,
  };
};

// add form data program
const addCurrReq = (payload: any) => {
  return {
    type: ActionTypes.ADD_CURRICULUM,
    payload,
  };
};

const addCurrRes = (payload: any) => {
  return {
    type: ActionTypes.ADD_CURRICULUM_RES,
    payload,
  };
};

// add section
const addSectReq = (payload: any) => {
  return {
    type: ActionTypes.ADD_SECTION,
    payload,
  };
};
const addSectRes = (payload: any) => {
  return {
    type: ActionTypes.ADD_SECTION_RES,
    payload,
  };
};

// add section detail
const addSectDetailReq = (id: any, payload: any) => {
  return {
    type: ActionTypes.ADD_SECTION_DETAIL,
    id,
    payload,
  };
};
const addSectDetailReS = (payload: any) => {
  return {
    type: ActionTypes.ADD_SECTION_DETAIL_RES,
    payload,
  };
};

// update form data program
const updateCurrReq = (data: any, id: any) => {
  return {
    type: ActionTypes.UPDATE_CURRICULUM,
    payload: { data, id },
  };
};

const updateCurrRes = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_CURRICULUM_RES,
    payload,
  };
};

// get curriculum number register
const getCurrnumber = () => {
  return {
    type: ActionTypes.GET_CURRNUMBER,
  };
};

const getCurrnumberRes = (currNumber: any) => {
  return {
    type: ActionTypes.GET_CURRNUMBER_RES,
    currNumber,
  };
};

// view section
const viewSection = () => {
  return {
    type: ActionTypes.VIEW_SECTION,
  };
};
const viewSectionRes = (sections: any) => {
  return {
    type: ActionTypes.VIEW_SECTION_RES,
    sections,
  };
};

// view section detail
const viewSectionDetail = () => {
    return{
        type: ActionTypes.VIEW_SECTION_DETAIL
    }
}
const viewSectionDetailRes = (sectionDetail:any) => {
    return{
        type: ActionTypes.VIEW_SECTION_DETAIL_RES,
        sectionDetail
    }
}

export {
  getAllCurrReq,
  getAllCurrRes,
  addCurrReq,
  addCurrRes,
  updateCurrReq,
  updateCurrRes,
  getCurrnumber,
  getCurrnumberRes,
  addSectReq,
  addSectRes,
  addSectDetailReS,
  addSectDetailReq,
  viewSection,
  viewSectionRes,
  viewSectionDetail,
  viewSectionDetailRes
};
