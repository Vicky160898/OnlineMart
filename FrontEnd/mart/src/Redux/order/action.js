import axios from "axios";
import {
  CREATE_ODER_FAILED,
  CREATE_ODER_REQUEST,
  CREATE_ODER_SUCCESS,
  ODER_FAILED,
  ODER_REQUEST,
  ODER_SUCCESS,
} from "./actiontype";

export const PlaceOrder = (el, toast) => async (dispatch) => {
  dispatch({ type: CREATE_ODER_REQUEST });
  try {
    let res = await axios.post(`http://localhost:8080/orders`, el);
    dispatch({ type: CREATE_ODER_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: CREATE_ODER_FAILED, payload: e.message });
  }
};

export const FinalOrder = (ele) => async (dispatch) => {
  dispatch({ type: ODER_REQUEST });
  try {
    let res = await axios.post(`http://localhost:8080/verify`, ele);
    dispatch({ type: ODER_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: ODER_FAILED, payload: e.message });
  }
};
