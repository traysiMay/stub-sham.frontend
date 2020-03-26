import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import {
  Container,
  Info,
  Separator,
  TicketContainer,
  Quantity,
  Dropdown,
  Button
} from "./styles/TicketForm";

interface Props {
  artist: string;
  venue: string;
  date: string;
  price: number;
  pickQuantity: any;
  img: string;
}

function TicketForm({ artist, venue, date, price, pickQuantity, img }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(1);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => setOpacity(1), 100);
  }, []);

  const nextPage = () => {
    setOpacity(0);
    setTimeout(() => pickQuantity(selected, price), 1000);
  };

  return (
    <Container opacity={opacity}>
      <Info>
        <div style={{ textTransform: "capitalize" }}>
          {artist} @ {venue}
        </div>
        <div>{dateFormat(date, "dddd, mmmm dS, yyyy")}</div>
        <div>{dateFormat(date, "h:MM: TT")}</div>
      </Info>
      <Separator>_______________________</Separator>
      <TicketContainer>
        <Quantity>
          ${price} <span style={{ marginLeft: 10 }}>X </span>
        </Quantity>
        <Dropdown className={open ? "open" : "closed"}>
          <div
            style={{
              background: "#1f1f1e",
              color: "white",
              border: "2px solid white",
              width: 50,
              marginTop: 1
            }}
          >
            <li className="clicker" onClick={() => setOpen(!open)}>
              {selected}
            </li>
            <div
              style={{
                position: "relative"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 50,
                  left: -2,
                  top: 4,
                  background: "#1f1f1e",
                  color: "white",
                  border: "2px solid white",
                  padding: open ? "7px 0" : ""
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(t => {
                  const select = t === selected ? "selected" : "";
                  return (
                    <li
                      key={t}
                      className={select}
                      onClick={() => {
                        setSelected(t);
                        setOpen(!open);
                      }}
                    >
                      {t}
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </Dropdown>
        <div>Total: ${price * selected}.00</div>
      </TicketContainer>
      <Button onClick={nextPage}>CHECKOUT</Button>
      <img src={img} />
    </Container>
  );
}

export default TicketForm;
