import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Button = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 40px;
  padding: 1rem;
  background: ${(props: { afterMarket: boolean; selected: boolean }) =>
    props.afterMarket && !props.selected ? "red" : "#6cccf1"};
  letter-spacing: 1px;
  border: 3px solid white;
  cursor: pointer;
  text-decoration: ${(props: { afterMarket: boolean; selected: boolean }) =>
    props.afterMarket && !props.selected ? "line-through" : "none"};
`;

function PurchaseButton({
  afterMarket,
  printTicket,
  setOpacity,
  fullname,
  selected
}: {
  afterMarket: boolean;
  printTicket: any;
  setOpacity: any;
  fullname: string;
  selected: boolean;
}) {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    if (!purchasing) return;
    setTimeout(() => printTicket(fullname), 3000);
    setTimeout(() => setOpacity(0), 2000);
    const startTime = Date.now();
    const button = document.getElementById("purchase-button");
    let frame: number;
    const animate = () => {
      const diff = Date.now() - startTime;
      frame = requestAnimationFrame(animate);
      const wave = (1.4 + Math.sin(diff * 0.01)) * 0.5;
      if (button) button.style.opacity = wave.toString();
    };
    animate();

    return () => cancelAnimationFrame(frame);
  }, [purchasing]);
  return (
    <Button
      afterMarket={afterMarket}
      selected={selected}
      id="purchase-button"
      onClick={() => {
        if (!selected && afterMarket) return;
        setPurchasing(true);
      }}
    >
      {purchasing ? "☺" : "PURCHASE"}
    </Button>
  );
}

export default PurchaseButton;
