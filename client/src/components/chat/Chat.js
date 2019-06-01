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
  Input
} from "../styledComponents/";
import Alert from "../sharedComponents/Alert";
import { getCurrentUser, logoutUser } from "../../store/actions/user";
import { sendMessage, getMessages } from "../../store/actions/message";
import { socket } from "./utils/socket";

socket.on("connect", () => {
  console.log("connected with socket.io");
});
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
    getCurrentUser();
    socket.on("chat", function(data) {
      chatRef.current.innerHTML += `<p>${data.userName}: ${data.message} </p>`;
    });
    socket.on("typing", function(data) {
      if (data.typing) {
        toggleTyping(true);
        typingRef.current.innerHTML = `<p>${data.userName} is typing...</p>`;
      } else {
        typingRef.current.innerHTML = "";
        toggleTyping(false);
      }
    });
  }, [getCurrentUser]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleInputChange = e => {
    setMessage(e.target.value);

    if (e.target.value.trim() !== "") {
      socket.emit(
        "typing",
        JSON.stringify({ userName: user.name, typing: true })
      );
    } else {
      socket.emit(
        "typing",
        JSON.stringify({ userName: user.name, typing: false })
      );
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    socket.emit(
      "chat",
      JSON.stringify({ userName: user.name, message: message })
    );
    socket.emit(
      "typing",
      JSON.stringify({ userName: user.name, typing: false })
    );
    // sendMessage(message);
    setMessage("");
  };
  console.log(chatRef, typingRef);
  return (
    <Container>
      <Header>Hi {user && user.name}</Header>
      <ChatWindow ref={chatRef} />{" "}
      {isTyping ? (
        <div
          ref={typingRef}
          style={{
            background: "red",
            color: "white",
            width: "100%",
            height: "50px"
          }}
        />
      ) : (
        <div
          ref={typingRef}
          style={{
            background: "red",
            color: "white",
            width: "100%",
            height: "0"
          }}
        />
      )}
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
