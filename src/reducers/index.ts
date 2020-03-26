import { combineReducers } from "redux";
import socket from "./socket";
import shows from "./shows";
import cart from "./cart";

import { State as SocketState } from "./socket";
import { State as ShowState } from "./shows";
import { State as CartState } from "./cart";

export type State = {
  socket: SocketState;
  shows: ShowState;
  cart: CartState;
};

export type Action<T> = {
  type: string;
  payload: T;
};

export default combineReducers({ cart, shows, socket });
