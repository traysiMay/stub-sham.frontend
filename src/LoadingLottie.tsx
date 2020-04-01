import React from "react";
import Lottie from "react-lottie";
import animationData from "./loading.json";
import { Logo } from "./containers/Logo";

const LoadingLottie = () => {
  return (
    <div style={{ display: "block", margin: "auto", maxWidth: "400px" }}>
      {/* <Logo /> */}
      <Lottie options={{ autoplay: true, loop: true, animationData }} />
    </div>
  );
};

export default LoadingLottie;
