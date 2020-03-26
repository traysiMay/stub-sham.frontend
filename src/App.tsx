import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { State } from "./reducers";
import { State as SocketState } from "./reducers/socket";
import { State as ShowsState } from "./reducers/shows";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import Purchase from "./containers/Purchase";
import { initShows } from "./actions";
import Checkout from "./containers/Checkout";
import Ticket from "./containers/Ticket";
import Creator from "./Creator";
import Waiting from "./Waiting";
import { Logo } from "./containers/Logo";

interface Props {
  socket: SocketState;
  dispatch: any;
  shows: ShowsState;
}

function App({ dispatch, socket, shows }: Props) {
  useEffect(() => {
    dispatch(initShows());
  }, []);
  if (socket.readyState === 1) {
    return <div>connecting...</div>;
  }
  if (shows.loading) return <div>loading...</div>;
  if (shows.status === "creator") return <Creator />;
  if (shows.status === "waiter") return <Waiting />;
  return (
    <div>
      <Link to="/">
        <Logo />
      </Link>
      <Switch>
        <Route path="/purchase/:id" component={Purchase} />
        <Route path="/checkout/:id" component={Checkout} />
        <Route path="/ticket/:id" component={Ticket} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ socket, shows }: State) => ({ socket, shows });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
