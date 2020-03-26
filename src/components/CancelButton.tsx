import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.div`
  background: red;
  padding: 6px;
  border: 1px solid white;
  position: absolute;
  top: ${(props: { top: number }) => props.top + "px"};
`;
function CancelButton() {
  const [top, setTop] = useState(0);
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("CANCEL");
  const jump = () => {
    setCounter(counter + 1);
    if (top === 0) {
      setTop(60);
    } else {
      setTop(0);
    }
    if (counter > 10 && counter < 20) {
      setText("NOOO!");
    }
    if (counter > 20 && counter < 30) {
      setText("FUCK YOU!!!!");
    }
    if (counter > 40) {
      setTop(10000);
      setText("GO AWAY!");
    }
  };

  return (
    <Button top={top} onMouseEnter={jump}>
      {text}
    </Button>
  );
}

export default CancelButton;
