import {
  GET_MESSAGES,
  GET_MESSAGES_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR
} from "../types";

const initialState = {
  messages: []
};

export const message = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MESSAGES:
      return { ...state, messages: [...payload] };
    case GET_MESSAGES_ERROR:
      return state;
    case SEND_MESSAGE:
      return { ...state, messages: [...state.messages, payload] };
    case SEND_MESSAGE_ERROR:
      return state;
    default:
      return state;
  }
};
