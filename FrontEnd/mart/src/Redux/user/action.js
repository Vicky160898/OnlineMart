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

export const LoginData = (data, toast) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    let res = await axios.post(`http://localhost:8080/api/login`, data);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("User", JSON.stringify(res.data));
    toast({
      title: "Hurry Up! You Login Successfully!",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    return;
  } catch (e) {
    dispatch({ type: LOGIN_FAILURE, payload: e.message });
    toast({
      title: "Invalid Credentials! OR Singup First!",
      description: e.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
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
