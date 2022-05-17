import { GET_CONTACTS } from "../actions/types";

const initialState = {
  data: []
};

const contactReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default contactReducer;
