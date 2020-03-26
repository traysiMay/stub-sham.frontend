import { Action } from "./";

export type State = {
  quantity: number;
  price: number;
  showId: number | null;
  fullname: string;
};

export type CartPayload = {
  quantity: number;
  price: number;
  showId: number;
  fullname: string;
};

const initialState: State = {
  quantity: 0,
  price: 0,
  showId: null,
  fullname: ""
};

const reducer = (state: State = initialState, action: Action<CartPayload>) => {
  let quantity, price, showId, fullname;
  if (action.payload) {
    price = action.payload.price;
    quantity = action.payload.quantity;
    showId = action.payload.showId;
    fullname = action.payload.fullname;
  }
  switch (action.type) {
    case "INIT_CART":
      return { ...state, price, quantity, showId, fullname };
    case "PICK_SHOW":
      return { ...state, showId };
    case "CHECKOUT":
      const newState = { ...state, quantity, price };
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case "PURCHASE":
      localStorage.setItem("cart", JSON.stringify({ ...state, fullname }));
      return { ...state, fullname };
    default:
      return state;
  }
};
export default reducer;
