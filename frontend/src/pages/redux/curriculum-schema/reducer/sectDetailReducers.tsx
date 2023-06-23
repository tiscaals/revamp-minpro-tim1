import ActionTypes from '../action/actionType';

const initialState = {
  sectionDetail: [],
  message: '',
  status: 0,
  refreshSectDetail: '',
};

function SectionDetailReducers(state = initialState, action: any) {
  const { type, sectionDetail } = action;
  //   console.log('sectionDetail', sectDetail);
  switch (type) {
    case ActionTypes.VIEW_SECTION_DETAIL_RES:
      return {
        state,
        sectionDetail: sectionDetail,
        refreshSect: true,
      };
    default:
      return state;
  }
}

export default SectionDetailReducers;
