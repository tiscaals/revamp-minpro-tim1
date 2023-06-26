import ActionTypes from './actionType';

//view employee
export const reqplacement = () => {
  return {
    type: ActionTypes.REQ_GET_EMPLOYEE,
  };
};
export const getplacementresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_EMPLOYEE_RESPONSE,
    payload,
  };
};
//view talents
export const reqtalents = () => {
  return {
    type: ActionTypes.REQ_GET_TALENTS,
  };
};
export const gettalentsresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_TALENTS_RESPONSE,
    payload,
  };
};
//view talents
export const reqtalentsJob = () => {
  return {
    type: ActionTypes.REQ_GET_TALENTS_JOB,
  };
};
export const gettalentsjobresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_TALENTS_JOB_RESPONSE,
    payload,
  };
};

//view search
export const reqsearchusers = () => {
  return {
    type: ActionTypes.REQ_GET_SEARCH,
  };
};
export const getsearchresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_SEARCH_RESPONSE,
    payload,
  };
};
//view search client
export const reqsearchclient = () => {
  return {
    type: ActionTypes.REQ_SEARCH_CLIENT,
  };
};
export const getclientresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_CLIENT_RESPONSE,
    payload,
  };
};

//find employee
export const reqfindemployee = (payload: any) => {
  return {
    type: ActionTypes.REQ_FIND_EMPLOYEE,
    payload
  };
};
export const getfindemployeeresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_FIND_EMPLOYEE_RESPONSE,
    payload,
  };
};

//find dept history
export const reqdepthistory = (payload: any) => {
  console.log('udah disini')
  return {
    type: ActionTypes.REQ_DEPT_HISTORY,
    payload
  };
};
export const getdepthistoryresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_DEPT_HISTORY_RESPONSE,
    payload,
  };
};

//find SALARY history
export const reqsalaryhistory = (payload: any) => {
  console.log('udah disini')
  return {
    type: ActionTypes.REQ_SALARY_HISTORY,
    payload
  };
};
export const getsalaryhistoryresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_SALARY_HISTORY_RESPONSE,
    payload,
  };
};

//view department
export const reqdepartment = () => {
  // console.log('setelah dispatch');
  return {
    type: ActionTypes.REQ_GET_DEPARTMENT,
  };
};
export const getdepartmentresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_DEPARTMENT_RESPONSE,
    payload,
  };
};

//view masterjoro
export const reqmasterjoro = () => {
  return {
    type: ActionTypes.REQ_GET_JOROMASTER,
  };
};
export const getmasterjororesponse = (payload: any) => {
  return {
    type: ActionTypes.GET_JOROMASTER_RESPONSE,
    payload,
  };
};

//view usersroles
export const requsersroles = () => {
  return {
    type: ActionTypes.REQ_GET_USERSROLES,
  };
};
export const getusersrolesresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_USERSROLES_RESPONSE,
    payload,
  };
};

//view job type
export const reqjobtype = () => {
  return {
    type: ActionTypes.REQ_GET_JOBTYPE,
  };
};
export const getujotyresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_JOBTYPE_RESPONSE,
    payload,
  };
};

//view account manager
export const reqaccountmanager = () => {
  return {
    type: ActionTypes.REQ_GET_AM,
  };
};
export const getAMresponse = (payload: any) => {
  return {
    type: ActionTypes.GET_AM_RESPONSE,
    payload,
  };
};

//create employee
export const reqdataemployee = (payload: any) => {
  return {
    type: ActionTypes.REQ_CREATE_DATA_EMPLOYEE,
    payload,
  };
};
export const getdataemployeeres = (payload: any) => {
  return {
    type: ActionTypes.GET_DATA_EMPLOYEE_RES,
    payload,
  };
};

//update employee
export const requpdateemployee = (payload: any) => {
  return {
    type: ActionTypes.REQ_UPDATE_EMPLOYEE,
    payload,
  };
};
export const getupdateemployeeres = (payload: any) => {
  return {
    type: ActionTypes.GET_UPDATE_EMPLOYEE_RES,
    payload,
  };
};

//create employee talents
export const reqtalentsemp = (payload: any) => {
  return {
    type: ActionTypes.REQ_TALENTS_EMPLOYEE,
    payload,
  };
};
export const gettalentsempres = (payload: any) => {
  return {
    type: ActionTypes.GET_TALENTS_EMPLOYEE_RES,
    payload,
  };
};
