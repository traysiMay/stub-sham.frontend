import React from "react";
import dateFormat from "dateformat";
import { Container, Img, InfoTainer, Button } from "./styles/Show";

interface Props {
  artist: string;
  venue: string;
  date: string;
  id: number;
  img: string;
  purchaseFlow: any;
}

function Show({ artist, venue, date, id, img, purchaseFlow }: Props) {
  return (
    <Container>
      <Img src={img} />
      <InfoTainer style={{ position: "absolute" }}>
        <div>{artist}</div>
        <div style={{ textTransform: "capitalize" }}>{venue}</div>
        <div>{dateFormat(date, "dddd, mmmm dS, yyyy")}</div>
        <div>{dateFormat(date, "h:MM TT")}</div>
        <Button>
          <div onClick={() => purchaseFlow(id)}>BUY</div>
        </Button>
      </InfoTainer>
    </Container>
  );
}

export default Show;
