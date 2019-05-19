import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Button, Form, Header, Input } from "../styledComponents/";
import Alert from "../sharedComponents/Alert";
import { registerUser } from "../../store/actions/user";
import { setAlert } from "../../store/actions/alert";

const SignUp = ({ registerUser, setAlert, auth, alert }) => {
  console.log(auth, alert.alertType);
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
          You already have an account?<Link to="/">Login Here.</Link>
        </p>
        <small>* Your password should have at least 5 characters</small>
      </Form>{" "}
    </Container>
  );
};

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.auth,
    alert: state.alert
  };
};
export default connect(
  mapStateToProps,
  { registerUser, setAlert }
)(SignUp);
