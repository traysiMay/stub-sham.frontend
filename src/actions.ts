import { Action } from "redux";
import { State } from "./reducers";
import { ThunkAction } from "redux-thunk";
import io from "socket.io-client";
export const CONNECTING = "CONNECTING";
export const CONNECTED = "CONNECTED";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  Action<string>
>;

interface SocketConnected {
  connected: boolean;
}
export const forceLoading = (): AppThunk => async dispatch => {
  dispatch({ type: "TRANS" });
  setTimeout(() => dispatch({ type: "READY" }), 1500);
};

const delayThunk = ({
  type,
  payload,
  delay
}: {
  type: string;
  payload: any;
  delay: number;
}): AppThunk => async dispatch => {
  setTimeout(() => dispatch({ type, payload }), delay);
};
const socketServer =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_SERVER
    : "https://relay.raptor.pizza";
export const connectSocket = (): AppThunk => async dispatch => {
  const socket = io(socketServer as string, {
    path: process.env.REACT_APP_SOCKET_PATH,
    transports: ["websocket"]
  });
  dispatch({ type: CONNECTING, payload: { socket } });
  socket.on(CONNECTED, (connected: SocketConnected) => {
    if (connected) {
      dispatch({ type: CONNECTED, payload: null });
    }
  });
  socket.on("message", (message: string) =>
    dispatch({ type: "NEW_MESSAGE", payload: { message } })
  );
  socket.on("start", (data: any) => {
    const { onsale, status } = data;
    // dispatch({ type: "INIT_SHOWS", payload: { onsale, status } });
    dispatch({
      type: "INIT_SHOWS",
      payload: { onsale, status }
    });
  });
};

export const initShows = (): AppThunk => dispatch => {
  fetch(`${process.env.REACT_APP_SERVER}/initShows`, { credentials: "include" })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const { onsale, status } = data;
      dispatch(
        delayThunk({
          type: "INIT_SHOWS",
          payload: { onsale, status },
          delay: 1500
        })
      );
    });
};

export const sendQuantity = (
  quantity: number,
  price: number
): AppThunk => dispatch => {
  dispatch({ type: "CHECKOUT", payload: { price, quantity } });
};

export const sendMessage = (message: string): AppThunk => async (
  dispatch,
  getState
) => {
  const socket = getState().socket.socket as any;
  socket.emit("message", message);
};
