import axios from "axios";

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actiontype";

export const LoginData = (data) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    let res = await axios.post(`http://localhost:8080/api/login`, data);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("User", JSON.stringify(res.data));
    alert("Login Successful");
    return;
  } catch (e) {
    dispatch({ type: LOGIN_FAILURE, payload: e.message });
    alert("Login Failed please enter correct details or Signup first!");
  }
};

export const SignData = (data) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    let res = await axios.post(`http://localhost:8080/api/login/signup`, data);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    return;
  } catch (e) {
    dispatch({ type: SIGNUP_FAILURE, payload: e.message });
  }
};

