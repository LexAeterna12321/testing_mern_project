import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Form,
  Header,
  Input,
  Error
} from "../styledComponents/";

import { registerUser } from "../../store/actions/user";
import { setAlert } from "../../store/actions/alert";

const SignUp = ({ registerUser, setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: ""
  });

  const handleFormSubmit = e => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setAlert("Passwords do not match", "danger", 3000);
      return;
    }

    console.log(formData);
    registerUser({ name, email, password });
  };
  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, email, password, confirmedPassword } = formData;

  return (
    <Container>
      <Header>Register</Header>
      <Form onSubmit={e => handleFormSubmit(e)}>
        <Input
          onChange={e => handleInputChange(e)}
          value={name}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <Input
          onChange={e => handleInputChange(e)}
          value={email}
          type="email"
          name="email"
          required
          placeholder="Email"
        />{" "}
        <Input
          onChange={e => handleInputChange(e)}
          value={password}
          type="password"
          name="password"
          required
          placeholder="Password"
        />
        <Input
          onChange={e => handleInputChange(e)}
          value={confirmedPassword}
          type="password"
          required
          name="confirmedPassword"
          placeholder="Confirm Password"
        />
        <Button id="send" type="submit">
          Register
        </Button>
        <p>
          You already have an account?<Link to="/">Login Here.</Link>
        </p>
        <Error />
      </Form>{" "}
    </Container>
  );
};

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { registerUser, setAlert }
)(SignUp);
