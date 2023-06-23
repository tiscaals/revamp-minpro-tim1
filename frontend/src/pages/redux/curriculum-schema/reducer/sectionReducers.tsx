import ActionTypes from '../action/actionType';

const initialState = {
  section: [],
  message: '',
  status: 0,
  refreshSect: '',
};

function SectionReducers(state = initialState, action: any) {
  const { type, sections } = action;
//   console.log('section', sections);
  switch (type) {
    case ActionTypes.VIEW_SECTION_RES:
      return {
        state,
        section: sections,
        message: sections.message,
        status: sections.status,
        refreshSect: true,
      };
    default:
      return state;
  }
}

export default SectionReducers;
