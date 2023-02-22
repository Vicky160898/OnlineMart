import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "./actiontype";

const details = {
  user: localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : null,
  loading: false,
  error: "",
};

export const UserReducer = (state = details, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: payload };
    case SIGNUP_REQUEST:
      return { ...state, loading: true };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, user: payload };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
