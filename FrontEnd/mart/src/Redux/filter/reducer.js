import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } from "./actiontype";

const initial = {
  loading: false,
  pro: [],
  // countProduct: 0,
  // page: 0,
  // pages: 0,
  erorr: "",
};

export const FilterReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      console.log(payload);
      return { ...state, pro: payload, loading: false };

    case FETCH_FAILED:
      return {
        ...state,
        loading: false,
        erorr: payload,
      };

    default:
      return state;
  }
};
