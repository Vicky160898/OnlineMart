import axios from "axios";
import {
  CREATE_ODER_FAILED,
  CREATE_ODER_REQUEST,
  CREATE_ODER_SUCCESS,
  DELETE_ODER,
  ODER_FAILED,
  ODER_REQUEST,
  ODER_SUCCESS,
} from "./actiontype";

export const PlaceOrder = (OrderId, user) => async (dispatch) => {
  dispatch({ type: CREATE_ODER_REQUEST });
  try {
    let res = await axios.get(`http://localhost:8080/api/orders/${OrderId}`, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    dispatch({ type: CREATE_ODER_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: CREATE_ODER_FAILED, payload: e.message });
  }
};

export const History = (user) => async (dispatch) => {
  dispatch({ type: ODER_REQUEST });
  try {
    let res = await axios.get(`http://localhost:8080/api/orders`, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    dispatch({ type: ODER_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: ODER_FAILED, payload: e.message });
  }
};

export const DeleteOrder = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/api/orders/delete/${id}`);
    dispatch({ type: DELETE_ODER, payload: id });
  } catch (e) {
    console.log(e);
  }
};
