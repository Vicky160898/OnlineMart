import axios from "axios";
import {
  CREATE_ODER_FAILED,
  CREATE_ODER_REQUEST,
  CREATE_ODER_SUCCESS,
} from "./actiontype";

export const PlaceOrder = (OrderId, user, toast) => async (dispatch) => {
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
