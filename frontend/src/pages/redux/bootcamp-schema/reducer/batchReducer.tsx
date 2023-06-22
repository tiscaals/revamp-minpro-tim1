import ActionTypes from '../action/actionType';

const initialState = {
  batches: [],
  batch: [],
  message: '',
  status: 0,
  refresh: '',
};

function batchReducers(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.RES_GET_BATCHES:
      return { state, batches: payload.data, refresh: true };

    case ActionTypes.RES_GET_BATCH:
      return {
        state,
        batch: payload.dataOne[0],
        message: payload.message,
        status: payload.status,
        refresh: true,
      };

    case ActionTypes.RES_CREATE_BATCH:
      return {
        state,
        message: payload.message,
        status: payload.status,
        refresh: false,
      };

    case ActionTypes.RES_EDIT_BATCH:
      return {
        state,
        message: payload.message,
        status: payload.status,
        refresh: false,
      };

    case ActionTypes.RES_DELETE_BATCH:
      return {
        state,
        message: payload.message,
        status: payload.status,
        refresh: false,
      };

    default:
      return state;
  }
}

export default batchReducers;
