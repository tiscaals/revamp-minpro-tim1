import ActionTypes from '../action/actionType';

const initialState = {
  placement: [],
  talents: [],
  client: [],
  jobType: [],
  AM: [],
  message: '',
  status: '',
  refresh: '',
};

function hrReducers(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_EMPLOYEE_RESPONSE:
      return { ...state, placement: payload, refresh: true };
    case ActionTypes.GET_CLIENT_RESPONSE:
      return { ...state, client: payload, refresh: true };
    case ActionTypes.GET_JOBTYPE_RESPONSE:
      return { ...state, jobType: payload, refresh: true };
    case ActionTypes.GET_AM_RESPONSE:
      return { ...state, AM: payload, refresh: true };

    case ActionTypes.GET_TALENTS_RESPONSE:
      return { ...state, talents: payload, refresh: true };

    case ActionTypes.GET_TALENTS_EMPLOYEE_RES:
      return {
        ...state,
        message: payload.message,
        status: payload.status,
        refresh: false,
      };

    default:
      return state;
  }
}

export default hrReducers;
