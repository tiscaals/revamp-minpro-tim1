import ActionType from '../action/actionType';

const initialState = {
  category: [],
  message: '',
  status: 0,
  refreshCat: '',
};

function CategoryReducers(state = initialState, action: any) {
  const { type, categories } = action;
  console.log("category", categories);
  switch (type) {
    case ActionType.GET_CATEGORY_RES:
      return { state, category: categories, refreshCat: true };
    default:
      return state;
  }
}

export default CategoryReducers;
