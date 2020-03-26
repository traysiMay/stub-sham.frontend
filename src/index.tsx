import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { connectSocket } from "./actions";

store.dispatch(connectSocket());

const cart = localStorage.getItem("cart");

if (cart) {
  const existingCart = JSON.parse(cart);
  const { price, quantity, showId, fullname } = existingCart;
  store.dispatch({
    type: "INIT_CART",
    payload: { price, quantity, showId, fullname }
  });
}
ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);
