import React, { useEffect, useRef } from "react";
import "./App.css";
import { connect } from "react-redux";
import { State } from "./reducers";
import { State as SocketState } from "./reducers/socket";
import { State as ShowsState } from "./reducers/shows";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import Purchase from "./containers/Purchase";
import { initShows } from "./actions";
import Checkout from "./containers/Checkout";
import Ticket from "./containers/Ticket";
import Creator from "./Creator";
import Waiting from "./Waiting";
import { Logo } from "./containers/Logo";
import LoadingLottie from "./LoadingLottie";
import styled from "styled-components";
import raptorJesus from "./RAPTOR_JESUS.png";

const Cookie = styled.div`
  background: red;
  bottom: 0;
  padding: 1rem;
  left: 15%;
  position: fixed;
  transition: height 1s, font-size 0.3s;
  width: 223px;
  height: 0px;
  .wrapper {
    position: relative;
    .clicked {
      display: none;
    }
    .button-container {
      display: flex;
      justify-content: space-around;

      .button {
        padding: 1rem;
        background: black;
        border: 2px solid white;
        margin: 1rem;
      }
    }

    img {
      position: absolute;
      top: 220px;
      transition: top 1s;
    }
  }
`;

interface Props {
  socket: SocketState;
  dispatch: any;
  shows: ShowsState;
}

function App({ dispatch, socket, shows }: Props) {
  const cookieRef = useRef() as any;
  const imgRef = useRef() as any;
  useEffect(() => {
    dispatch(initShows());
  }, []);

  // next level jank
  useEffect(() => {
    if (!cookieRef || !cookieRef.current) return;
    if ((shows.status as any) !== "running") return;
    const acceptedJesus = localStorage.getItem("acceptedJesus");
    if (acceptedJesus === "yes") {
      cookieRef.current.style.display = "none";
    } else {
      setTimeout(() => (cookieRef.current.style.height = "221px"), 100);
    }
  }, [shows.loading, shows.status]);

  if (socket.readyState === 1) {
    return (
      <div>
        <Logo />
        <LoadingLottie />
      </div>
    );
  }
  if (shows.loading)
    return (
      <div>
        <Logo />
        <LoadingLottie />
      </div>
    );

  if (shows.status === "creator") return <Creator />;
  if (shows.status === "waiter") return <Waiting />;

  return (
    <div>
      <Link to="/">
        <Logo />
      </Link>
      <Switch>
        <Route path="/purchase/:id" component={Purchase} />
        <Route path="/checkout/:id" component={Checkout} />
        <Route path="/ticket/:id" component={Ticket} />
        <Route path="/" component={Home} />
      </Switch>
      <Cookie ref={cookieRef}>
        <div className="wrapper">
          <div className="text">
            Hello! This site does not use cookies at all. This site does accept
            all cookie donations, especially anything with chocolate or peanut
            butter. do you accept Raptor Jesus as your Lord and Savior?
          </div>
          <div className="button-container">
            <div
              className="button"
              onClick={() => {
                localStorage.setItem("acceptedJesus", "yes");
                imgRef.current.style.top = "110px";
                document.querySelector(".button-container")!.className =
                  "clicked";
                setTimeout(() => {
                  document.querySelector(".text")!.innerHTML =
                    "bless you my child";
                  cookieRef.current.style.fontSize = "40px";
                  setTimeout(
                    () => (cookieRef.current.style.display = "none"),
                    2000
                  );
                }, 1000);
              }}
            >
              YES
            </div>
            <div
              className="button"
              onClick={() => {
                imgRef.current.style.top = "110px";
                document.querySelector(".button-container")!.className =
                  "clicked";
                setTimeout(() => {
                  document.querySelector(".text")!.innerHTML =
                    "no tickets for you!";
                  cookieRef.current.style.fontSize = "40px";
                  setTimeout(() => {
                    document.body.innerHTML =
                      "raptor jesus has baleted this page, but you can probably just refresh it.";
                    document.body.style.margin = "3rem";
                  }, 2000);
                }, 1000);
              }}
            >
              NAW
            </div>
          </div>
          <img ref={imgRef} src={raptorJesus} width={100} />
        </div>
      </Cookie>
    </div>
  );
}

const mapStateToProps = ({ socket, shows }: State) => ({ socket, shows });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(App);
