import React, { Fragment } from "react";
import { Container, ChatWindow, Button, Form } from "../styledComponents/";
import "./chat.css";
const Chat = () => {
  return (
    <Container>
      <ChatWindow>
        <div id="output" />
        <div id="feedback" />
      </ChatWindow>
      <Form>
        <input type="text" id="userName" placeholder="Name" />
        <input type="text" id="message" placeholder="Message" />{" "}
        <Button id="send" type="submit">
          Send
        </Button>
        <div id="error" />
      </Form>
    </Container>
  );
};

export default Chat;
