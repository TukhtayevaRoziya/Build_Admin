import { GET_NETWORK_URL } from "./../actions/types";

const initialState = {
  data: [],
};

const networkUrlReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NETWORK_URL:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};

export default networkUrlReducer;
