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
  value: {},
  error: "",
};

export const OrderRdeucer = (state = initial, { type, payload }) => {
  switch (type) {
    case CREATE_ODER_REQUEST:
      return { ...state, loading: true };
    case CREATE_ODER_SUCCESS:
      return { ...state, loading: false, order: payload };
    case CREATE_ODER_FAILED:
      return { ...state, error: payload };
    case ODER_REQUEST:
      return { ...state, loading: true };
    case ODER_SUCCESS:
      return { ...state, loading: false, value: payload };
    case ODER_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
