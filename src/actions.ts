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

export const connectSocket = (): AppThunk => async dispatch => {
  const socket = io(process.env.REACT_APP_SERVER as string);
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
    dispatch({ type: "INIT_SHOWS", payload: { onsale, status } });
  });
};

export const initShows = (): AppThunk => dispatch => {
  fetch(`${process.env.REACT_APP_SERVER}/initShows`, { credentials: "include" })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const { onsale, status } = data;
      dispatch({ type: "INIT_SHOWS", payload: { onsale, status } });
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

// export const spotifySearch = (artist:string) => {
//       fetch(process.env.REACT_APP_SERVER + "/search", {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ artist })
//     })
//       .then(r => r.json())
//       .then(data => {
//         if (data.error && data.error.message === "The access token expired") {
//           return
//         } else {
//           if (data.artists.items.length === 0) setError("nothing found");
//           setArtists(data.artists.items);
//         }
//       });
// }
