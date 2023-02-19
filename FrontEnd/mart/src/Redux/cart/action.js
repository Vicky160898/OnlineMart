import { ADD_TO_CART } from "./actiontype";

export const CartItme = (data,quantity) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { ...data, quantity } });
};
