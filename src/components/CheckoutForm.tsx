import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import styled from "styled-components";
import Input from "./bits/Input";
import PurchaseButton from "./PurchaseButton";
import CancelButton from "./CancelButton";

export const Container = styled.form`
  border: 3px solid white;
  width: 333px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 21px;
  padding: 1rem;
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition: opacity 1s;
  font-size: 12px;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 21px;
  grid-column: 1 / span 3;

  input::placeholder {
    color: #6ccfff;
  }
`;

const Review = styled.div`
  grid-area: 1 / 1 / span 1 / span 3;
  padding: 10px;
  font-size: 15px;
  div {
    margin: 5px 0 0;
  }
  .artist-venue {
    font-size: 27px;
    text-transform: capitalize;
  }
  .service-fee {
    font-size: 8px;
  }
  .total {
    color: #f56767;
  }
`;

const ListItemContainer = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: 30% 8% 15% 10% 10%;
  div:first-child,
  div:nth-child(3) {
    text-align: left;
  }
`;

interface Props {
  cart: any;
  printTicket: any;
  show: any;
}

function CheckoutForm({ cart, printTicket, show }: Props) {
  const [opacity, setOpacity] = useState(0);
  const [fullname, setFullname] = useState("");
  useEffect(() => {
    setTimeout(() => setOpacity(1), 10);
  }, []);
  if (!show && !cart) return <div>what</div>;

  const handleChange = (e: any) => setFullname(e.target.value);

  const { artist, venue, date } = show;
  const { price, quantity } = cart;
  return (
    <Container opacity={opacity}>
      <Review>
        <div className={"artist-venue"}>
          {artist} @ {venue}
        </div>
        {/* <div>{venue}</div> */}
        <div className="time-date">
          {dateFormat(date, "mm/dd/yy")} {dateFormat(date, "h:MM TT")}
        </div>
        <div>__________________________________</div>
        <ListItemContainer>
          <div>Price:</div>
          <div></div> <div>${price}</div> <div>X</div> <div>{quantity}</div>
        </ListItemContainer>
        <ListItemContainer>
          <div>Subtotal:</div>
          <div></div> <div>${price * quantity}.00</div>
        </ListItemContainer>
        <ListItemContainer className="service-fee">
          <div>Service Fee:</div>
          <div></div> <div>${Math.floor(price * quantity * 0.69)}.00</div>
        </ListItemContainer>
        <ListItemContainer className="total">
          <div>Total:</div>
          <div></div>
          <div>
            ${Math.floor(price * quantity * 0.69 + price * quantity)}.00
          </div>
        </ListItemContainer>
      </Review>
      <Inputs>
        <Input
          className="input"
          name={"name"}
          label={"Full Name"}
          placeholder={"Full Name"}
          handleChange={handleChange}
        />
        <Input
          className=""
          name={"cardnumber"}
          label={"Credit Card"}
          placeholder={"XXXX XXXX XXXX XXXX"}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <Input
            className="first"
            name={"CCTV"}
            label={"CCTV"}
            placeholder={"CCTV"}
          />
          <Input
            className="second"
            name={"cc-exp"}
            label={"Expiration Date"}
            placeholder={"Exp. Date"}
          />
        </div>
      </Inputs>
      <PurchaseButton
        printTicket={printTicket}
        fullname={fullname}
        setOpacity={setOpacity}
      />
      <div style={{ position: "relative" }}>
        <CancelButton />
      </div>
    </Container>
  );
}

export default CheckoutForm;
