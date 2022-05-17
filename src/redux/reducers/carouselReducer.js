import { GET_CAROUSEL } from "../actions/types";

const initialState = {
  data: []
};

const carouselReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CAROUSEL:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default carouselReducer;
