import { GET_CONSTRUCTIONS } from "../actions/types";
import { CREATE_CONSTRUCTION } from './../actions/types';

const initialState = {
  data: []
};

const constructionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONSTRUCTIONS:
      return {
        ...state,
        data: payload
      };
    case CREATE_CONSTRUCTION:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default constructionReducer;
