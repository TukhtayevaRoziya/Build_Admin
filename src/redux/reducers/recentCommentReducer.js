import { CREATE_COMMENT, GET_COMMENTS } from "../actions/types";


const initialState = {
  data: []
};

const recentCommentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        data: payload
      };
    case CREATE_COMMENT:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default recentCommentReducer;
