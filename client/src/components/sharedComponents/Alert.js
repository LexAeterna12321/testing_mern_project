import React from "react";
import PropTypes from "prop-types";
import { Error } from "../styledComponents/";
const Alert = ({ alert }) => {
  return alert.length > 0 ? (
    alert.map(alert => (
      <Error
        key={alert.id}
        alertType={alert.alertType === "danger" ? "danger" : "success"}
      >
        {alert.msg}
      </Error>
    ))
  ) : (
    <Error />
  );
};

Alert.propTypes = {
  alert: PropTypes.array
};

export default Alert;
