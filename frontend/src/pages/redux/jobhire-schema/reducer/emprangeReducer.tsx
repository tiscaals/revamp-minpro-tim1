import ActionTypes from '../action/actionType';

const initialState = {
  emp_range: [],
  messageEmp: '',
  statusEmp: '',
  refreshEmp: '',
};

function EmprangeReducers(state = initialState, action: any) {
  const { type, payload } = action;
  console.log('EMP RANGE', payload);
  switch (type) {
    case ActionTypes.RES_GET_EMPRANGE:
      return { state, emp_range: payload, refreshEmp: true };

    default:
      return state;
  }
}

export default EmprangeReducers;
