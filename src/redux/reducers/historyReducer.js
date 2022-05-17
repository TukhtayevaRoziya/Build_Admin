import { GET_HISTORY } from "../actions/types";

const initialState = {
  data: []
};

const historyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_HISTORY:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default historyReducer;
