const { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } = require("./actiontype");

const initial = {
  loading: false,
  pro: [],
  erorr: "",
};

export const FilterReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
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
