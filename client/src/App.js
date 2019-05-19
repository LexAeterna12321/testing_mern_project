import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact to="/chat" component={Chat} />
      </Switch>
    </Router>
  );
};

export default App;
