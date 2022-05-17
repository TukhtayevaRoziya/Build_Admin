import { CREATE_CATEGORY, GET_CATEGORIES } from "../actions/types";

const initialState = {
  data: []
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        data: payload
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default categoryReducer;
