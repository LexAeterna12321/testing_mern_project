import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combinedReducers from "../reducers";
const initialState = {};
export default createStore(
  combinedReducers,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )
);
