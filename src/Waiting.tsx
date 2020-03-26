import React, { useState, useEffect, useRef } from "react";
import Lottie from "react-lottie";
import animationData from "./waiting.json";
import styled from "styled-components";
import { connect } from "react-redux";
import { State } from "./reducers";
import { sendMessage } from "./actions";
import { Logo } from "./containers/Logo";

const ChatBox = styled.div`
  border: 3px solid white;
  padding: 1rem;
  margin: 1 rem;
  min-height: 300px;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 15px auto;
  max-width: 260px;
`;
const Input = styled.input`
  background: black;
  border: 2px solid white;
  color: white;
  text-align: center;
`;
const Button = styled.div`
  background: black;
  color: white;
  border: 3px solid white;
  padding: 0.5rem;
`;
const Waiting = ({ state, sendMessage }: any) => {
  const [inputText, setInputText] = useState("");
  const chatWrap = useRef() as any;
  const sendIt = () => {
    if (!inputText) return;
    sendMessage(inputText);
    setInputText("");
  };

  useEffect(() => {
    chatWrap.current.scrollTop = chatWrap.current.scrollHeight;
  }, [state.socket.messages]);

  return (
    <div style={{ height: "100%", margin: "1rem" }}>
      <Logo />
      <Lottie options={{ autoplay: true, loop: true, animationData }} />
      <div style={{ fontSize: 20, margin: "15px 0" }}>
        <div>for the ticket sale to start...</div>
        <div>feel free to say something stupid</div>
      </div>
      <ChatBox>
        <div
          ref={chatWrap}
          style={{ height: "80%", maxHeight: "300px", overflow: "auto" }}
        >
          {state.socket.messages.map((m: any, i: number) => (
            <div key={m + i}>☺: {m}</div>
          ))}
        </div>
        <InputWrapper>
          <Input
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") sendIt();
            }}
            value={inputText}
          />
          <Button onClick={sendIt}>send it</Button>
        </InputWrapper>
      </ChatBox>
    </div>
  );
};

const mapStateToProps = (state: State) => ({ state });
const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
  sendMessage: (message: string) => dispatch(sendMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Waiting);
