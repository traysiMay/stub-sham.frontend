import React from "react";
import { connect } from "react-redux";
import { State } from "../reducers";
import CheckoutForm from "../components/CheckoutForm";
import { showById } from "./utils";
import { Redirect } from "react-router-dom";

interface Props {
  history: any;
  state: State;
  dispatch: any;
}

function Checkout({ history, state, dispatch }: Props) {
  if (state.shows.onsale.length === 0) return <div>what</div>;
  let show = {};
  if (state.cart.showId) {
    show = showById(state.cart.showId, state.shows);
  }

  const printTicket = (fullname: string) => {
    history.push(`/ticket/${state.cart.showId}`);
    dispatch({ type: "PURCHASE", payload: { fullname } });
  };

  if (!show) {
    return <Redirect to="/" />;
  }
  return (
    <CheckoutForm cart={state.cart} printTicket={printTicket} show={show} />
  );
}

const mapStateToProps = (state: State) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps)(Checkout);
