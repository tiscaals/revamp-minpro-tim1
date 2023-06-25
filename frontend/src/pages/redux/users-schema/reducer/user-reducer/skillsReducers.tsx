import ActionTypes from '../../action/actionType';

const initialState = {
  skills: [],
  message: '',
  status: 0,
  refresh: '',
};

function skillsReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_SKILL:
      return {
        state,
        skills: payload,
        refresh: true,
      };
    default:
      return state;
  }
}

export default skillsReducers;
