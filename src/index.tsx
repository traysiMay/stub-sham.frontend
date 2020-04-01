import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { connectSocket } from "./actions";
import { Logo } from "./containers/Logo";

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

const isLocalHost = (hostname: any) =>
  !!(
    hostname === "localhost" ||
    hostname === "[::1]" ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

const HttpsRedirect = ({ disabled, children }: any) => {
  if (
    !disabled &&
    typeof window !== "undefined" &&
    window.location &&
    window.location.protocol === "http:" &&
    !isLocalHost(window.location.hostname)
  ) {
    window.location.href = window.location.href.replace(/^http(?!s)/, "https");
    return null;
  }

  return children;
};

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <Router basename="/">
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>
  </HttpsRedirect>,
  document.getElementById("root")
);
