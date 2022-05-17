import { GET_PROJECT } from './../actions/types';

const initialState = {
  data: []
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default projectReducer;
