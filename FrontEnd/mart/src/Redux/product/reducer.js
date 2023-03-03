import {
  PRODUCT_FAILED,
  PRODUCT_REQUEST,
  PRODUCT_SINGLE_FAILED,
  PRODUCT_SINGLE_REQUEST,
  PRODUCT_SINGLE_SUCCESS,
  PRODUCT_SUCCESS,
} from "./actiontype";

const initialState = {
  data: [],
  single:{},
  loading: false,
  error: "",
};

//Product reducer here for getting data according to action..
export const ReducerProduct = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case PRODUCT_SINGLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        single: payload,
      };
    case PRODUCT_SINGLE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

