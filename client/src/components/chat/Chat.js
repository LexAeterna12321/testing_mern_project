import React, { useState, useEffect } from "react";
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
import { getCurrentUser } from "../../store/actions/user";
import "./chat.css";

const Chat = ({ isAuthenticated, alert, user, getCurrentUser }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleInputChange = e => {
    setMessage(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <Header>Hi {user.name}</Header>
      <ChatWindow>
        <div id="output" />
        <div id="feedback" />
      </ChatWindow>
      <Form onSubmit={e => handleFormSubmit(e)}>
        <Input
          onChange={e => handleInputChange(e)}
          type="text"
          name="message"
          placeholder="Message"
          value={message}
        />{" "}
        <Button id="send" type="submit">
          Send
        </Button>{" "}
        <GrayedButton type="button">
          <a href="/">Go Back to Login</a>
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
  getCurrentUser: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Chat);
