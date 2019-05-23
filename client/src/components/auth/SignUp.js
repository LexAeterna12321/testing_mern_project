import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Form,
  Header,
  Input,
  StyledLink
} from "../styledComponents/";
import { Redirect } from "react-router-dom";
import Alert from "../sharedComponents/Alert";
import { registerUser } from "../../store/actions/user";
import { setAlert } from "../../store/actions/alert";

const SignUp = ({ registerUser, setAlert, isAuthenticated, alert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: ""
  });

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setAlert("Passwords do not match", "danger", 3000);
      return;
    }

    registerUser({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/chat" />;
  }

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
          placeholder="Password *"
        />
        <Input
          onChange={e => handleInputChange(e)}
          value={confirmedPassword}
          type="password"
          required
          name="confirmedPassword"
          placeholder="Confirm Password"
        />
        <Button type="submit">Register</Button>
        <Alert alert={alert} />
        <p>
          You already have an account?
          <StyledLink to="/"> Login Here.</StyledLink>
        </p>
        <small>* Your password should have at least 5 characters</small>
      </Form>{" "}
    </Container>
  );
};

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  alert: PropTypes.array
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    alert: state.alert
  };
};
export default connect(
  mapStateToProps,
  { registerUser, setAlert }
)(SignUp);
