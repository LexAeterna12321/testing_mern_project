import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_MESSAGES,
  GET_MESSAGES_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR
} from "../types";
export const sendMessage = message => async dispatch => {
  try {
    const body = { msg: message };
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const res = await axios.post("/api/chat", body, config);
    dispatch({ type: SEND_MESSAGE, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach(err => {
      dispatch(setAlert(err.msg, "danger"));
    });
    dispatch({ type: SEND_MESSAGE_ERROR });
  }
};

export const getMessages = () => async dispatch => {
  try {
    const res = await axios.get("/api/chat");
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_MESSAGES_ERROR });
  }
};
