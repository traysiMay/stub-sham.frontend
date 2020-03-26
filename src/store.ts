import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducers, { State, Action } from "./reducers";
import { SocketPayload } from "./reducers/socket";

const peel = ({ getState, dispatch }: any) => {
  return (next: any) => (action: any) => {
    console.log(action);
    console.log(getState());
    next(action);
  };
};
const store = createStore(
  reducers,
  applyMiddleware(
    thunk as ThunkMiddleware<State, Action<SocketPayload>>,
    peel as any
  )
);

export default store;
