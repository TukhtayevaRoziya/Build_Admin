import { GET_USER_COMMENT } from "../actions/types";

const initialState = {
  data: []
};

const userCommentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_COMMENT:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default userCommentReducer;
