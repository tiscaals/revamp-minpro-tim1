import ActionTypes from '../action/actionType';

const initialState = {
  message: '',
  status: 0,
  refresh: '',
  routes: [],
};

function routeReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_ROUTES:
      return { state, routes: payload.data, refresh: true };
    default:
      return state;
  }
}

export default routeReducers;
