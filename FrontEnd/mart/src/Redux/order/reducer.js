import {
  CREATE_ODER_FAILED,
  CREATE_ODER_REQUEST,
  CREATE_ODER_SUCCESS,
  ODER_FAILED,
  ODER_REQUEST,
  ODER_SUCCESS,
} from "./actiontype";

const initial = {
  loading: false,
  order: {},
  history: [],
  error: "",
};

export const OrderRdeucer = (state = initial, { type, payload }) => {
  switch (type) {
    case CREATE_ODER_REQUEST:
      return { ...state, loading: true, error: "" };
    case CREATE_ODER_SUCCESS:
      return { ...state, loading: false, order: payload, error: "" };
    case CREATE_ODER_FAILED:
      return { ...state, loading: false, error: payload };
    case ODER_REQUEST:
      return { ...state, loading: true, error: "" };
    case ODER_SUCCESS:
      return { ...state, loading: false, history: payload, error: "" };
    case ODER_FAILED:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
