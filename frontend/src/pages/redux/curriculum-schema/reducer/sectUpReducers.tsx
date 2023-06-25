import ActionTypes from '../action/actionType';

const initialState = {
  sectionUp: [],
  message: '',
  status: 0,
  refreshSectUp: '',
};

function SectionUpReducers(state = initialState, action: any) {
  const { type, sectionUps } = action;
  console.log('sectionDetail', sectionUps);
  switch (type) {
    case ActionTypes.GET_SECTION_UP_RES:
      return {
        sectionUp: sectionUps,
        refreshSectUp: true,
      };
    default:
      return state;
  }
}

export default SectionUpReducers;
