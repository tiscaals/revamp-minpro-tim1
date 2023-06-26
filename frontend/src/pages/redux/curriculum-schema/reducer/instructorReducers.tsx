import ActionTypeCurr from '../action/actionType';

const initialState = {
  instructor: [],
  message: '',
  status: 0,
  refreshIns: '',
};

function InstructorReducers(state = initialState, action: any) {
  const { type, instructors } = action;
  switch (type) {
    case ActionTypeCurr.GET_INSTRUCTOR_RES:
      return {
        state,
        instructor: instructors,
        refreshIns: true,
      };
    default:
      return state;
  }
}

export default InstructorReducers;
