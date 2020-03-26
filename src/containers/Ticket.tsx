import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import dateFormat from "dateformat";
import { connect } from "react-redux";
import { State } from "../reducers";
import { OnSale } from "../reducers/shows";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem 1rem;
  margin: auto;
  background: black;
  max-width: 260px;
  border: 2px solid white;
  div {
    * {
      display: block;
      margin: 0 auto;
    }
  }

  img {
    width: 70%;
    border: 6px solid white;
    margin-bottom: 12px;
  }
  .top {
    margin-bottom: 10px;
  }
  .field {
    width: 70%;
    margin: 1px auto;
    text-transform: capitalize;
    .label {
      font-size: 12px;
      font-weight: 500;
      color: red;
    }
    .value {
      margin-top: -4px;
      font-size: 24px;
    }
    .venue {
      font-size: 20px;
    }
    .date {
      font-size: 18px;
    }

    .venue,
    .date {
      margin-left: 1px;
    }
  }
`;
interface Props {
  state: State;
}

function Ticket({ state }: Props) {
  console.log(state);
  const [qr, setQr] = useState("" as any);
  const makeQR = async (value: string) => {
    var opts: any = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      color: { light: "#000000", dark: "#FFFFFF" },
      width: 400,
      rendererOpts: {
        quality: 1
      }
    };
    const qr = await QRCode.toDataURL(value, opts);
    setQr(qr);
    return qr;
  };
  const showObject = state.shows.onsale[0] as OnSale;
  useEffect(() => {
    makeQR("https://open.spotify.com/artist/" + showObject.artists.id);
  }, []);
  if (!state.shows.onsale) return <div>what</div>;

  return (
    <Container>
      <div>
        <img src={qr} />
      </div>
      <div className="top">
        <div className="field">
          <div className="label">NAME</div>
          <div className="value">
            {state.cart.fullname ? state.cart.fullname : "ANONYMOUS"}
          </div>
        </div>
      </div>
      <div className="field">
        <div className="label">SHOW</div>
        <div className="value">{showObject.artist}</div>
        <div className="venue">{showObject.venue}</div>
        <div className="date">
          {dateFormat(showObject.date, "dddd, mmmm dS")}
          <div>{dateFormat(showObject.date, "h:MM TT")}</div>
        </div>
      </div>
    </Container>
  );
}

const mapStateToProps = (state: State) => ({ state });
export default connect(mapStateToProps)(Ticket);
