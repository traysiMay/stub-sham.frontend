import { Action } from "./";

enum SaleStatus {
  CREATOR = "creator",
  WAITER = "waiter",
  ONSALE = "onsale"
}

export type State = {
  onsale: object[];
  status: SaleStatus;
  loading: boolean;
};

export type ShowPayload = {
  onsale: object[];
  status: SaleStatus;
};

const initialState: State = {
  onsale: [],
  status: SaleStatus.WAITER,
  loading: true
};

export type OnSale = {
  artist: string;
  date: string;
  venue: string;
  id: number;
  img: string;
  artists: any;
};

const reducer = (state: State = initialState, action: Action<ShowPayload>) => {
  console.log(action.type);
  switch (action.type) {
    case "INIT_SHOWS":
      const { onsale, status } = action.payload;
      return { ...state, onsale, status, loading: false };
    default:
      return state;
  }
};
export default reducer;
