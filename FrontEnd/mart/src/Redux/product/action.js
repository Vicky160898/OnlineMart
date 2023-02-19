import axios from "axios";
import utils from "../../utils";
import {
  PRODUCT_FAILED,
  PRODUCT_REQUEST,
  PRODUCT_SINGLE_FAILED,
  PRODUCT_SINGLE_REQUEST,
  PRODUCT_SINGLE_SUCCESS,
  PRODUCT_SUCCESS,
} from "./actiontype";

//here we dispatch action for getting the data..
export const GetProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  try {
    let res = await axios.get(`http://localhost:8080`);
    dispatch({ type: PRODUCT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: PRODUCT_FAILED, payload: utils(error) });
  }
};

export const GetSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_SINGLE_REQUEST });
  try {
    let res = await axios.get(`http://localhost:8080/slug/${id}`);
    dispatch({ type: PRODUCT_SINGLE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: PRODUCT_SINGLE_FAILED, payload: utils(error) });
  }
};
