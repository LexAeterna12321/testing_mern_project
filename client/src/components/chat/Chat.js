import React, { Fragment } from "react";
import { Container, ChatWindow } from "../styledComponents/";
import "./chat.css";
const Chat = () => {
  return (
    <Container>
      <ChatWindow>
        <div id="output" />
        <div id="feedback" />
      </ChatWindow>
      <form id="form">
        <input type="text" id="userName" placeholder="Name" />
        <input type="text" id="message" placeholder="Message" />{" "}
        <button id="send" type="submit">
          Send
        </button>
        <div id="error" />
      </form>
    </Container>
  );
};

export default Chat;
