import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/Signup" exact component={SignUp} />
        <Route path="/chat" exact component={Chat} />
      </Switch>
    </Router>
  );
};

export default App;
