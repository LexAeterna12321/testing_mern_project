import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  Header,
  Container,
  ChatWindow,
  Button,
  GrayedButton,
  Form,
  Input,
  TypingContainer
} from "../styledComponents/";
import Alert from "../sharedComponents/Alert";
import { getCurrentUser, logoutUser } from "../../store/actions/user";
import { sendMessage, getMessages } from "../../store/actions/message";
import { initSocket, handleOnSockets, handleEmitSockets } from "./utils/socket";

const Chat = ({
  isAuthenticated,
  alert,
  user,
  getCurrentUser,
  logoutUser,
  sendMessage,
  getMessages
}) => {
  const [message, setMessage] = useState("");

  const [isTyping, toggleTyping] = useState(false);
  const chatRef = useRef({});
  const typingRef = useRef({});

  useEffect(() => {
    initSocket();
    getCurrentUser();
  }, [getCurrentUser]);

  useEffect(() => {
    handleOnSockets("typing", typingRef, user.name, toggleTyping);
  }, []);

  useEffect(() => {
    handleOnSockets("chat", chatRef, user.name, toggleTyping);
    return () =>
      handleEmitSockets("typing", { userName: user.name, typing: false });
  }, [user.name]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleInputChange = e => {
    setMessage(e.target.value);

    if (e.target.value.trim() !== "") {
      handleEmitSockets("typing", { userName: user.name, typing: true });
    } else {
      handleEmitSockets("typing", { userName: user.name, typing: false });
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (message.trim() === "") return;

    handleEmitSockets("chat", { userName: user.name, message: message });
    handleEmitSockets("typing", { userName: user.name, typing: false });

    // sendMessage(message);
    setMessage("");
  };

  return (
    <Container>
      <Header>Hi {user && user.name}</Header>
      <ChatWindow ref={chatRef} />{" "}
      <TypingContainer ref={typingRef} isTyping={isTyping} />
      <Form onSubmit={e => handleFormSubmit(e)}>
        <Input
          onChange={e => handleInputChange(e)}
          type="text"
          name="message"
          placeholder="Message"
          value={message}
        />{" "}
        <Button type="submit">Send</Button>{" "}
        <GrayedButton type="button" onClick={logoutUser}>
          <Link to="/">Logout</Link>
        </GrayedButton>
      </Form>
      <Alert alert={alert} />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    alert: state.alert,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
    messages: state.message.messages
  };
};
Chat.propTypes = {
  alert: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCurrentUser, logoutUser, sendMessage, getMessages }
)(Chat);
