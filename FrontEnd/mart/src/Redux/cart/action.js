import { ADD_TO_CART, REMOVE_CART_ITEM } from "./actiontype";
import { SHIPPING_ADDRESS_SUCCESSE, LOGOUT_SUCCESS } from "./actiontype";

export const CartItme = (data, quantity) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { ...data, quantity } });
};

export const DeteleItem = (item) => (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: item });
};

export const ShippingItme = (data) => async (dispatch) => {
  dispatch({ type: SHIPPING_ADDRESS_SUCCESSE, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const Logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  localStorage.removeItem("User");
  localStorage.removeItem("shippingAddress");
  alert("Logout Successful");
};
