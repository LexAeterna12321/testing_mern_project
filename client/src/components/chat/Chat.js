import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { socket } from "./utils/socket";
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
import uuid from "uuid";

const Chat = ({ isAuthenticated, alert, user, getCurrentUser, logoutUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [types, setTypes] = useState("");

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleInputChange = e => {
    setMessage(e.target.value);
    socket.emit("typing", { user: user.name, message: message });
    socket.on("typing", data => {
      if (message !== "") {
        setTypes(data);
      } else {
        setTypes(``);
      }
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    socket.emit("chat", { userName: user.name, message: message });
    setMessage("");
    setTypes("");
    socket.emit("typing", { user: user.name, message: message });
    socket.on("chat", function(data) {
      const msg = `${data.userName} : ${data.message}`;

      setMessages([...messages, msg]);
    });
  };

  return (
    <Container>
      <Header>Hi {user && user.name}</Header>
      <ChatWindow>
        {types}
        {messages.map(msg => {
          return <p key={uuid.v4()}>{msg}</p>;
        })}
      </ChatWindow>
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
    user: state.user
  };
};
Chat.propTypes = {
  alert: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCurrentUser, logoutUser }
)(Chat);
