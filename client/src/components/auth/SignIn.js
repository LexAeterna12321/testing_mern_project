import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Container,
  Button,
  Form,
  Header,
  Input,
  StyledLink
} from "../styledComponents/";
import Alert from "../sharedComponents/Alert";
import { loginUser } from "../../store/actions/user";
import { setAlert } from "../../store/actions/alert";

const SignIn = ({ loginUser, isAuthenticated, alert }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  if (isAuthenticated) {
    return <Redirect to="/chat" />;
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    loginUser({ email, password });
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
        <Alert alert={alert} />
        <p>
          You don't have an account?
          <StyledLink to="/signup"> Regsiter Here.</StyledLink>
        </p>
      </Form>{" "}
    </Container>
  );
};

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  alert: PropTypes.array
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated, alert: state.alert };
};

export default connect(
  mapStateToProps,
  { loginUser, setAlert }
)(SignIn);
