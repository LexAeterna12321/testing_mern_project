import { GET_USER, GET_USER_ERROR, LOGOUT } from "../types";

const initialState = {
  user: {}
};

export const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return { ...state, ...payload };
    case GET_USER_ERROR:
      return { ...state };
    case LOGOUT:
      return { ...state, user: {} };
    default:
      return state;
  }
};
