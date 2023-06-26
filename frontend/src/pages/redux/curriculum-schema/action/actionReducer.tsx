import ActionTypeCurr from './actionType';

// get view
const getAllCurrReq = () => {
  return {
    type: ActionTypeCurr.GET_CURRICULUM,
  };
};

const getAllCurrRes = (payload: any) => {
  return {
    type: ActionTypeCurr.GET_CURRICULUM_RES,
    payload,
  };
};

// add form data program
const addCurrReq = (payload: any) => {
  return {
    type: ActionTypeCurr.ADD_CURRICULUM,
    payload,
  };
};

const addCurrRes = (payload: any) => {
  return {
    type: ActionTypeCurr.ADD_CURRICULUM_RES,
    payload,
  };
};

// add section
const addSectReq = (payload: any) => {
  return {
    type: ActionTypeCurr.ADD_SECTION,
    payload,
  };
};
const addSectRes = (payload: any) => {
  return {
    type: ActionTypeCurr.ADD_SECTION_RES,
    payload,
  };
};

// add section detail
const addSectDetailReq = (id: any, payload: any) => {
  return {
    type: ActionTypeCurr.ADD_SECTION_DETAIL,
    id,
    payload,
  };
};
const addSectDetailReS = (payload: any) => {
  return {
    type: ActionTypeCurr.ADD_SECTION_DETAIL_RES,
    payload,
  };
};

// update form data program
const updateCurrReq = (id: any, payload: any) => {
  return {
    type: ActionTypeCurr.UPDATE_CURRICULUM,
    id,
    payload,
  };
};

const updateCurrRes = (payload: any) => {
  return {
    type: ActionTypeCurr.UPDATE_CURRICULUM_RES,
    payload,
  };
};

// get curriculum number register
const getCurrnumber = () => {
  return {
    type: ActionTypeCurr.GET_CURRNUMBER,
  };
};

const getCurrnumberRes = (currNumber: any) => {
  return {
    type: ActionTypeCurr.GET_CURRNUMBER_RES,
    currNumber,
  };
};

// view section
const viewSection = () => {
  return {
    type: ActionTypeCurr.VIEW_SECTION,
  };
};
const viewSectionRes = (sections: any) => {
  return {
    type: ActionTypeCurr.VIEW_SECTION_RES,
    sections,
  };
};

// view section detail
const viewSectionUp = (id: any) => {
  return {
    type: ActionTypeCurr.GET_SECTION_UP,
    id,
  };
};
const viewSectionUpRes = (sectionUps: any) => {
  return {
    type: ActionTypeCurr.GET_SECTION_UP_RES,
    sectionUps,
  };
};

// GET CURR BY ID
const currById = (id: any) => {
  return {
    type: ActionTypeCurr.GET_CURR_BY_ID,
    id,
  };
};
const currByIdRes = (payload: any) => {
  return {
    type: ActionTypeCurr.GET_CURR_BY_ID_RES,
    payload,
  };
};

// merge section
const getSectionMerge = () => {
  return {
    type: ActionTypeCurr.GET_SECT_MERGE,
  };
};
const getSectionMergeRes = (sections: any) => {
  return {
    type: ActionTypeCurr.GET_SECT_MERGE_RES,
    sections,
  };
};

// get all
const getAlltable = (id: any) => {
  return {
    type: ActionTypeCurr.GET_ALL,
    id,
  };
};
const getAlltableRes = (getAlls: any) => {
  return {
    type: ActionTypeCurr.GET_ALL_RES,
    getAlls,
  };
};

// get instructor
const getInstructor = () => {
  return {
    type: ActionTypeCurr.GET_INSTRUCTOR,
  };
};
const getInstructorRes = (instructors: any) => {
  return {
    type: ActionTypeCurr.GET_INSTRUCTOR_RES,
    instructors,
  };
};

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
  viewSectionUp,
  viewSectionUpRes,
  currById,
  currByIdRes,
  getSectionMerge,
  getSectionMergeRes,
  getAlltable,
  getAlltableRes,
  getInstructor,
  getInstructorRes,
};
