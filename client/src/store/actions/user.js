import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_USER,
  GET_USER_ERROR,
  LOGOUT
} from "../types";
import setAuthToken from "../utils/setAuthToken";

export const getCurrentUser = () => async dispatch => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`/api/users/me`);
    dispatch({ type: GET_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_USER_ERROR });
  }
};
export const registerUser = formData => async dispatch => {
  const { name, email, password } = formData;

  const config = {
    headers: { "Content-Type": "application/json" }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert("Registration success", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach(err => {
      dispatch(setAlert(err.msg, "danger"));
    });
    dispatch({ type: REGISTER_ERROR });
  }
};
export const loginUser = formData => async dispatch => {
  const { email, password } = formData;

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: { "Content-Type": "application/json" }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(setAlert("Logged In", "success"));
  } catch (error) {
    const errors = error.response.data.errors;

    errors &&
      errors.forEach(err => {
        dispatch(setAlert(err.msg, "danger"));
      });

    dispatch({ type: LOGIN_ERROR });
  }
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT });
};
