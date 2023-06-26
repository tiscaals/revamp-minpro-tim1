import ActionTypes from '../action/actionType';

const initialState = {
  job_post: [],
  job_detail: [],
  job_photo: [],
  cur_number: [],
  search_jobpost: [],
  message: '',
  status: '',
  refresh: '',
  message2: '',
};

function JobPostReducers(state = initialState, action: any) {
  const { type, payload, cur_number } = action;
  // console.log("jopoReducer payload",payload);
  switch (type) {
    case ActionTypes.RES_GET_JOBPOST:
      return { ...state, job_post: payload[0], refresh: true };

    case ActionTypes.RES_GET_JOBBYID:
      return { ...state, job_detail: payload[0], refresh: true };

    case ActionTypes.RES_GET_JOBPHOTO:
      return { ...state, job_photo: payload, refresh: true };

    case ActionTypes.RES_GET_CURNUMBER:
      return { ...state, cur_number: cur_number, refresh: true };

    case ActionTypes.RES_SEARCH_JOBPOST:
      return { ...state, search_jobpost: payload, refresh: true };

    case ActionTypes.RES_ADD_JOBPOST:
      return {
        message: payload.message,
        status: payload.status,
        message2: payload.result,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_JOBPOST:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypes.RES_UPDATE_STATUS:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypes.RES_DELETE_JOBPOST:
      return {
        message: payload.message,
        status: payload.status,
        refresh: false,
      };

    case ActionTypes.RESET_STATE:
      return {
        initialState,
      };

    default:
      return state;
  }
}

export default JobPostReducers;
