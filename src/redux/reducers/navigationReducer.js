import { CREATE_NAVIGATION, GET_NAVIGATIONS } from "../actions/types";


const initialState = {
  data: []
};

const navigationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NAVIGATIONS:
      return {
        ...state,
        data: payload
      };
    case CREATE_NAVIGATION:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default navigationReducer;
