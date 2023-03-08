import axios from "axios";
import { FETCH_FAILED, FETCH_REQUEST, FETCH_SUCCESS } from "./actiontype";
export const FetchData =
  (category, query, price, rating, order, page) => async (dispatch) => {
    dispatch({ type: FETCH_REQUEST });
    try {
      let res = await axios.get(
        `http://localhost:8080/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
      );
      console.log(res.data);
      dispatch({ type: FETCH_SUCCESS, payload: res.data });
    } catch (e) {
      dispatch({ type: FETCH_FAILED, payload: e });
    }
  };
