const { ADD_TO_CART } = require("./actiontype");

const initial = {
  cart: {
    cartitems: [],
  },
};

export const CartReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      //add to cart
      const newItem = payload;
      const ExitProduct = state.cart.cartitems.find(
        (x) => x._id === newItem._id
      );
      const cartitems = ExitProduct
        ? state.cart.cartitems.map((x) =>
            x._id === ExitProduct._id ? newItem : x
          )
        : [...state.cart.cartitems, newItem];
      return { ...state, cart: { ...state.cart, cartitems } };
    default:
      return state;
  }
};
