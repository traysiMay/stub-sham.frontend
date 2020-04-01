import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { State } from "../reducers";
import CheckoutForm from "../components/CheckoutForm";
import { showById } from "./utils";
import { Redirect } from "react-router-dom";
import LoadingLottie from "../LoadingLottie";
import { forceLoading } from "../actions";

interface Props {
  history: any;
  state: State;
  dispatch: any;
}

function Checkout({ history, state, dispatch }: Props) {
  const [soldCount, setSoldCount] = useState(0);
  useEffect(() => {
    dispatch(forceLoading());
  }, []);

  useEffect(() => {
    if (!state.cart.showId) return;
    fetch(process.env.REACT_APP_SERVER + "/check_sold", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: state.cart.showId })
    })
      .then(r => r.json())
      .then(d => {
        setSoldCount(d.count);
      });
  }, [state.cart.showId]);

  if (state.shows.tLoading) return <LoadingLottie />;
  if (state.shows.onsale.length === 0)
    return (
      <div>
        <div style={{ textAlign: "center", margin: "2rem", fontSize: "22px" }}>
          hm this ticket sale seems to be over
        </div>
        <LoadingLottie />
      </div>
    );
  let show = {};
  if (state.cart.showId) {
    show = showById(state.cart.showId, state.shows);
  }

  const printTicket = (fullname: string) => {
    history.push(`/ticket/${state.cart.showId}`);
    dispatch({ type: "PURCHASE", payload: { fullname } });
    fetch(process.env.REACT_APP_SERVER + "/add_sold", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: state.cart.showId })
    });
  };

  if (!show) {
    return <Redirect to="/" />;
  }
  return (
    <CheckoutForm
      cart={state.cart}
      printTicket={printTicket}
      show={show}
      soldCount={soldCount}
    />
  );
}

const mapStateToProps = (state: State) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps)(Checkout);
