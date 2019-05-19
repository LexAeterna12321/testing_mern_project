import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Form, Header, Input } from "../styledComponents/";
const SignIn = props => {
  return (
    <Container>
      <Header>Login</Header>
      <Form>
        <Input type="email" required placeholder="Email" />
        <Input type="password" required placeholder="Password" />{" "}
        <Button id="send" type="submit">
          Login
        </Button>
        <p>
          You don't have an account?<Link to="/signup">Regsiter Here.</Link>
        </p>
        <div id="error" />
      </Form>{" "}
    </Container>
  );
};

SignIn.propTypes = {};

export default SignIn;
