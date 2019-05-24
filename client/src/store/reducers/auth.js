import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false
};

export const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true };
    case LOGIN_ERROR:
    case REGISTER_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, isAuthenticated: false, token: null };
    default:
      return state;
  }
};
