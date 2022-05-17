import { GET_SERVICES } from "../actions/types";

const initialState = {
  data: []
};

const serviceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SERVICES:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default serviceReducer;
