import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from "../types";

const initialState = {
  name: "",
  email: "",
  password: ""
};
export const user = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, payload };
    case REGISTER_ERROR:
      return { ...state, payload };
    default:
      return state;
  }
};
