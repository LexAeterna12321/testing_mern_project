import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Button, Form, Header, Input } from "../styledComponents/";
import Alert from "../sharedComponents/Alert";
import { loginUser } from "../../store/actions/user";
import { setAlert } from "../../store/actions/alert";

const SignIn = ({ loginUser, setAlert, auth, alert }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

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
          You don't have an account?<Link to="/signup">Regsiter Here.</Link>
        </p>
      </Form>{" "}
    </Container>
  );
};

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  alert: PropTypes.array
};

const mapStateToProps = state => {
  return { auth: state.auth, alert: state.alert };
};

export default connect(
  mapStateToProps,
  { loginUser, setAlert }
)(SignIn);
