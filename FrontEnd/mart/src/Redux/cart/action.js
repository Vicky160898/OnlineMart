import { ADD_TO_CART, REMOVE_CART_ITEM } from "./actiontype";
import { SHIPPING_ADDRESS_SUCCESSE, LOGOUT_SUCCESS } from "./actiontype";

export const CartItme = (data, quantity, toast) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { ...data, quantity } });
};

export const DeteleItem = (item, toast) => (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: item });
  toast({
    title: "Item Deleted Successfully!",
    description: "",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};

export const ShippingItme = (data) => async (dispatch) => {
  dispatch({ type: SHIPPING_ADDRESS_SUCCESSE, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const Logout = (toast, navigate) => async (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  localStorage.removeItem("User");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("cartItems");
  window.location.reload(false);
  toast({
    title: "Logout Successful!",
    description: "",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
  navigate("/signup");
  return;
};
