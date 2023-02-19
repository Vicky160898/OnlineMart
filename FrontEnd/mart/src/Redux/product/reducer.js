import { PRODUCT_FAILED, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "./actiontype";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

//Product reducer here for getting data according to action..
export const ReducerProduct = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    case PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
