import axios from "axios";
import { PRODUCT_FAILED, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "./actiontype";

//here we dispatch action for getting the data..
export const GetProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  try {
    let res = await axios.get(`http://localhost:8080`);
    dispatch({ type: PRODUCT_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: PRODUCT_FAILED });
  }
};
