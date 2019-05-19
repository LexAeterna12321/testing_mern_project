import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Button, Form, Header, Input } from "../styledComponents/";

import { loginUser } from "../../store/actions/user";
import { setAlert } from "../../store/actions/alert";

const SignIn = ({ loginUser, setAlert }) => {
  const [formData, setFormData] = useState({
    email: "",

    password: ""
  });

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };
  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;
  return (
    <Container>
      <Header>Login</Header>
      <Form onSubmit={e => handleFormSubmit(e)}>
        <Input
          onChange={e => handleInputChange(e)}
          value={email}
          type="email"
          name="email"
          required
          placeholder="Email"
        />
        <Input
          onChange={e => handleInputChange(e)}
          value={password}
          type="password"
          name="password"
          required
          placeholder="Password"
        />{" "}
        <Button type="submit">Login</Button>
        <p>
          You don't have an account?<Link to="/signup">Regsiter Here.</Link>
        </p>
        <div id="error" />
      </Form>{" "}
    </Container>
  );
};

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { loginUser, setAlert }
)(SignIn);
