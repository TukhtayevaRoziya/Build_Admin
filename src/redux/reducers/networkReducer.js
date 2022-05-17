import { CREATE_NETWORK, GET_NETWORK } from './../actions/types';

const initialState = {
  data: []
};

const networkReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NETWORK:
      return {
        ...state,
        data: payload
      };
    case CREATE_NETWORK:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default networkReducer;
