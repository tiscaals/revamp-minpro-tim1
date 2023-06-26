import ActionTypes from '../action/actionType';

const initialState = {
  employee: [],
  department: [],
  joro: [],
  users: [],
  talejob:[],
  findEmp:[],
  depthis:[],
  salhis:[],
  message: '',
  status: '',
  refresh: '',
};

function empReducers(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_SEARCH_RESPONSE:
      return { ...state, employee: payload, refresh: true };
    case ActionTypes.GET_DEPARTMENT_RESPONSE:
      return { ...state, department: payload, refresh: true };
    case ActionTypes.GET_JOROMASTER_RESPONSE:
      return { ...state, joro: payload, refresh: true };
    case ActionTypes.GET_USERSROLES_RESPONSE:
      return { ...state, users: payload, refresh: true };
    case ActionTypes.GET_TALENTS_JOB_RESPONSE:
      return { ...state, talejob: payload, refresh: true };
    case ActionTypes.GET_FIND_EMPLOYEE_RESPONSE:
      return { ...state, findEmp: payload, refresh: true };
    case ActionTypes.GET_DEPT_HISTORY_RESPONSE:
      return { ...state, depthis: payload, refresh: true };
    case ActionTypes.GET_SALARY_HISTORY_RESPONSE:
      return { ...state, salhis: payload, refresh: true };
      
    case ActionTypes.GET_DATA_EMPLOYEE_RES:
      return {...state,
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    case ActionTypes.GET_UPDATE_EMPLOYEE_RES:
      return {...state,
        message: payload.message,
        status: payload.status,
        refresh: false,
      };
    default:
      return state;
  }
}

export default empReducers;
