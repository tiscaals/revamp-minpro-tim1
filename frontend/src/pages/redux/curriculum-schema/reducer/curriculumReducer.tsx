import ActionTypes from '../action/actionType';

const initialState = {
  curriculum: [],
  get_currNum: [],
  message: '',
  status: 0,
  refresh: '',
};

function CurriculumReducers(state = initialState, action: any) {
  const { type, payload, currNumber } = action;
//   console.log('currNumber :', currNumber);
// console.log('payload', payload);
  switch (type) {
    case ActionTypes.GET_CURRICULUM_RES:
      return { state, curriculum: payload, refresh: true };
    case ActionTypes.GET_CURRNUMBER_RES:
      return { state, get_currNum: currNumber, refresh: true };
    case ActionTypes.ADD_CURRICULUM_RES:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypes.UPDATE_CURRICULUM_RES:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypes.ADD_SECTION_RES:
        return{
            message: payload.message,
            status: payload.status,
            refresh: false,
        }
    case ActionTypes.ADD_SECTION_DETAIL_RES:
        return{
            message: payload.message,
            status: payload.status,
            refresh: false,
        }
    default:
      return state;
  }
}

export default CurriculumReducers;
