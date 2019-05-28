import React from "react";
import { render } from "react-dom";
import "./baseCSS/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/index";
import { socket } from "./components/chat/utils/socket";

socket.on("connect", () => {
  console.log("connected with socket.io");
});

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
