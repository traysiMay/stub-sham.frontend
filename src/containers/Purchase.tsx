import React, { useState } from "react";
import { connect } from "react-redux";
import { State } from "../reducers";
import TicketForm from "../components/TicketForm";
import { sendQuantity } from "../actions";
import { showById } from "./utils";

interface Props {
  state: State;
  history: any;
  match: any;
  sendQuantity: any;
}

function Purchase({ history, match, sendQuantity, state }: Props) {
  const pickQuantity = (quantity: number, price: number) => {
    sendQuantity(quantity, price);
    history.push(`/checkout/${match.params.id}`);
  };

  const show: any = showById(parseInt(match.params.id), state.shows);

  if (!show) return <div>what</div>;
  const { artist, date, venue, price, img } = show;
  return (
    <TicketForm
      artist={artist}
      date={date}
      img={img}
      venue={venue}
      price={price}
      pickQuantity={pickQuantity}
    />
  );
}

const mapStateToProps = (state: State) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({
  sendQuantity: (quantity: number, price: number) =>
    dispatch(sendQuantity(quantity, price))
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
