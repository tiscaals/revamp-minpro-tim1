import ActionTypeCurr from '../action/actionType';

const initialState = {
  curriculum: [],
  get_currNum: [],
  getCurrById: [],
  message: '',
  status: 0,
  refreshCurr: '',
};

function CurriculumReducers(state = initialState, action: any) {
  const { type, payload, currNumber } = action;
  //   console.log('currNumber :', currNumber);
  // console.log('payload', payload);
  switch (type) {
    case ActionTypeCurr.GET_CURRICULUM_RES:
      return { state, curriculum: payload, refresh: true };
    case ActionTypeCurr.GET_CURRNUMBER_RES:
      return { state, get_currNum: currNumber, refresh: true };
    case ActionTypeCurr.GET_CURR_BY_ID_RES:
      return { state, getCurrById: payload, refresh: true };
    case ActionTypeCurr.ADD_CURRICULUM_RES:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypeCurr.UPDATE_CURRICULUM_RES:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypeCurr.ADD_SECTION_RES:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypeCurr.ADD_SECTION_DETAIL_RES:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    default:
      return state;
  }
}

export default CurriculumReducers;
