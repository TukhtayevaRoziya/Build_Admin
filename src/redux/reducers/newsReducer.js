import { GET_NEWS } from './../actions/types';

const initialState = {
  data: []
};

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NEWS:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default newsReducer;
