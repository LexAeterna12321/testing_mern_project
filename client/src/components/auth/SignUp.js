import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Form, Header, Input } from "../styledComponents/";
const SignUp = props => {
  return (
    <Container>
      <Header>Register</Header>
      <Form>
        <Input type="text" id="name" required placeholder="Name" />
        <Input type="email" id="email" required placeholder="Email" />{" "}
        <Input type="password" id="password" required placeholder="Password" />
        <Input type="password" required placeholder="Confirm Password" />
        <Button id="send" type="submit">
          Register
        </Button>
        <p>
          You already have an account?<Link to="/">Login Here.</Link>
        </p>
        <div id="error" />
      </Form>{" "}
    </Container>
  );
};

SignUp.propTypes = {};

export default SignUp;
