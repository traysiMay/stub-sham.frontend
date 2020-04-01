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
  grid-row-gap: 7px;
  grid-row-gap: 21px;
  padding: 1rem;
  opacity: ${(props: { opacity: number }) => props.opacity};
  transition: opacity 1s;
  font-size: 12px;
  cursor: pointer;
  .selected {
    background: red;
  }
`;

const AfterMarketContainer = styled.div`
  display: grid;
  grid-template-columns: 29% 73% 1%;
  grid-column: 1 / span 3;
  grid-row-gap: 7px;
  width: 82%;
  margin: auto;
  text-align: left;
  border: 2px solid white;
  padding: 15px;

  .headers {
    grid-column: 1 / span 3;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 11px;
    border-bottom: 2px solid white;
    font-size: 13px;
  }
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
  soldCount: number;
}

const afterMarketData = [1, 2, 3, 4, 5, 6].map(v => {
  return {
    id: v,
    price: Math.floor(Math.random() * 200) + 99,
    quantity: Math.floor(Math.random() * 6) + 1
  };
});
function CheckoutForm({ cart, printTicket, show, soldCount }: Props) {
  const [afterMarket, setAfterMarket] = useState(soldCount > 5);
  const [selected, setSelected] = useState(null as any);
  const [price, setPrice] = useState(afterMarket ? 0 : cart.price);
  const [quantity, setQuantity] = useState(afterMarket ? 0 : cart.quantity);
  const [opacity, setOpacity] = useState(0);
  const [fullname, setFullname] = useState("");
  useEffect(() => {
    setTimeout(() => setOpacity(1), 10);
  }, []);
  useEffect(() => {});
  if (!show && !cart) return <div>what</div>;

  const handleChange = (e: any) => setFullname(e.target.value);

  const { artist, venue, date } = show;
  return (
    <Container opacity={opacity}>
      {afterMarket && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridColumn: "1 / span 3",
            fontSize: "20px",
            gridRowGap: "21px"
          }}
        >
          <div
            style={{
              gridColumn: "1 / span 3",
              fontSize: "20px",
              textAlign: "center"
            }}
          >
            HAHA your show is <span style={{ color: "red" }}>SOLDOUT</span>!
          </div>
          <div
            style={{
              gridColumn: "1 / span 3",
              fontSize: "20px",
              textAlign: "center"
            }}
          >
            Please select some after market bullshit
          </div>
          <AfterMarketContainer>
            <div className="headers">
              <div style={{ gridColumn: "1", paddingLeft: "10px" }}>Price</div>
              <div style={{ gridColumn: "2", textAlign: "center" }}>
                Quantity
              </div>
              <div
                style={{
                  gridColumn: "3",
                  textAlign: "left",
                  paddingLeft: "40px"
                }}
              >
                Total
              </div>
            </div>
            {afterMarketData.map(e => (
              <div
                className={selected === e.id ? "selected" : ""}
                onClick={() => {
                  setSelected(e.id);
                  setPrice(e.price);
                  setQuantity(e.quantity);
                }}
                style={{
                  display: "grid",
                  gridColumn: "1/span 3",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  borderBottom: "solid red",
                  // borderTop: "solid red",
                  marginBottom: "4px",
                  marginRight: "6px",
                  fontSize: "17px"
                }}
              >
                <div
                  style={{
                    gridColumn: "1/1",
                    paddingLeft: "7px",
                    marginBottom: "4px"
                  }}
                >
                  ${e.price}
                </div>
                <div
                  style={{
                    gridColumn: "2/2",
                    textAlign: "center",
                    marginBottom: "4px"
                  }}
                >
                  {e.quantity}
                </div>
                <div
                  style={{
                    gridColumn: "3/3",
                    textAlign: "left",
                    paddingLeft: "40px",
                    paddingRight: "6px"
                  }}
                >
                  ${e.price * e.quantity}
                </div>
              </div>
            ))}
          </AfterMarketContainer>
        </div>
      )}

      <Review>
        <div className={"artist-venue"}>
          {artist} @ {venue}
        </div>
        {/* <div>{venue}</div> */}
        <div className="time-date">{dateFormat(date, "mm/dd/yy")} 4:20 PM</div>
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
        afterMarket={afterMarket}
        selected={selected}
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
