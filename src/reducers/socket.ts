import { CONNECTING, CONNECTED } from "../actions";
import { Action } from "./";

export type State = {
  connected: boolean;
  readyState: number;
  socket: WebSocket | null;
  messages: string[];
};

export type SocketPayload = {
  socket: any;
  message: string;
};

const initialState: State = {
  connected: false,
  readyState: 0,
  socket: null,
  messages: []
};

const reducer = (
  state: State = initialState,
  action: Action<SocketPayload>
) => {
  switch (action.type) {
    case CONNECTING:
      const { socket } = action.payload;
      return { ...state, readyState: 1, socket };
    case CONNECTED:
      return { ...state, readyState: 2, connected: true };
    case "NEW_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload.message]
      };
    default:
      return state;
  }
};

export default reducer;
