import { GET_USER, GET_USER_ERROR } from "../types";

const initialState = {
  user: {}
};

export const user = (state = initialState, action) => {
  const { type, payload } = action;
  console.log({ payload });
  switch (type) {
    case GET_USER:
      return { ...state, ...payload };
    case GET_USER_ERROR:
      return { ...state };
    default:
      return state;
  }
};
