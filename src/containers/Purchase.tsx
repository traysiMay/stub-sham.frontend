import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State } from "../reducers";
import TicketForm from "../components/TicketForm";
import { sendQuantity, forceLoading } from "../actions";
import { showById } from "./utils";
import LoadingLottie from "../LoadingLottie";

interface Props {
  state: State;
  history: any;
  match: any;
  sendQuantity: any;
  forceLoading: any;
}

function Purchase({
  forceLoading,
  history,
  match,
  sendQuantity,
  state
}: Props) {
  useEffect(() => {
    forceLoading();
  }, []);
  const pickQuantity = (quantity: number, price: number) => {
    sendQuantity(quantity, price);
    history.push(`/checkout/${match.params.id}`);
  };

  const show: any = showById(parseInt(match.params.id), state.shows);
  if (state.shows.tLoading) return <LoadingLottie />;
  if (!show)
    return (
      <div>
        <div style={{ textAlign: "center", margin: "2rem", fontSize: "22px" }}>
          hm this ticket sale seems to be over
        </div>
        <LoadingLottie />
      </div>
    );
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
    dispatch(sendQuantity(quantity, price)),
  forceLoading: () => dispatch(forceLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
