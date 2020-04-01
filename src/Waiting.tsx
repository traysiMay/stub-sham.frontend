import React, { useState, useEffect, useRef } from "react";
import Lottie from "react-lottie";
import animationData from "./waiting.json";
import styled from "styled-components";
import { connect } from "react-redux";
import { State } from "./reducers";
import { sendMessage, initShows } from "./actions";
import { Logo } from "./containers/Logo";
const waitingMusic = require("./waiting_music.mp3");

const Timer = styled.div`
  text-align: center;
  color: red;
  font-size: 40px;
`;

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
const Waiting = ({ dispatch, state, sendMessage }: any) => {
  const [inputText, setInputText] = useState("");
  const [focus, setFocus] = useState(null as boolean | null);
  const [timer, setTimer] = useState("_:__") as any;
  const timerRef = useRef() as any;

  useEffect(() => {
    if (focus) {
      dispatch(initShows());
    }
    const toggleFocus = () => {
      setFocus(!focus);
    };
    window.addEventListener("focus", toggleFocus, false);
    window.addEventListener("blur", toggleFocus, false);
    return () => {
      window.removeEventListener("focus", toggleFocus, false);
      window.removeEventListener("blur", toggleFocus, false);
    };
  }, [focus]);

  const chatWrap = useRef() as any;
  const sendIt = () => {
    if (!inputText) return;
    sendMessage(inputText);
    setInputText("");
  };

  useEffect(() => {
    let interval: number;
    fetch(process.env.REACT_APP_SERVER + "/check")
      .then(r => r.json())
      .then(d => {
        const lastCreator = new Date(d.lastCreator).getTime();
        const fps = 2;
        const fpsInterval = 1000 / fps;
        let then = Date.now();
        const startTime = then;
        const animate = () => {
          const currentTime = new Date().getTime();
          interval = requestAnimationFrame(animate);
          const elapsed = currentTime - then;
          if (elapsed > fpsInterval) {
            then = currentTime - (elapsed & fpsInterval);
            const diff = currentTime - lastCreator;
            const timeLeft = 5 * 60 - diff / 1000;
            const minutes = Math.floor(timeLeft / 60);
            let seconds = Math.floor(timeLeft % 60).toString();
            if (seconds.toString().length === 1) seconds = "0" + seconds;
            timerRef!.current.innerText = `${minutes}:${seconds}`;
          }
        };
        animate();
      });
    return () => cancelAnimationFrame(interval);
  }, []);

  useEffect(() => {
    chatWrap.current.scrollTop = chatWrap.current.scrollHeight;
  }, [state.socket.messages]);

  return (
    <div
      style={{
        height: "100%",
        margin: window.innerHeight > window.innerWidth ? "1rem" : "1rem auto",
        maxWidth: "500px",
        display: "block"
      }}
      onClick={() => {
        document.querySelector("audio")?.play();
      }}
    >
      <Logo />
      <audio src={waitingMusic} autoPlay={true} loop={true} />
      <Lottie options={{ autoplay: true, loop: true, animationData }} />
      <Timer ref={timerRef}>{timer}</Timer>
      <div style={{ fontSize: 20, margin: "15px 4%" }}>
        <div>for the ticket sale to start...</div>
        <div style={{ textAlign: "right" }}>
          feel free to say something stupid
        </div>
      </div>
      <ChatBox>
        <div
          ref={chatWrap}
          style={{
            height: "80%",
            maxHeight: "300px",
            overflow: "auto",
            marginBottom: "5px"
          }}
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
