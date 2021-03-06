import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ActionCableProvider } from "react-actioncable-provider";
import thunk from "redux-thunk";
import "./index.css";
import App from "./components/App";
import * as reducers from "./redux/reducers";

const rootReducer = combineReducers(reducers);
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url="wss://flatchat-api.herokuapp.com/api/v1/cable">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ActionCableProvider>
  </Provider>,
  document.getElementById("root")
);
