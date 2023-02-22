const {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SHIPPING_ADDRESS_SUCCESSE,
  LOGOUT_SUCCESS,
} = require("./actiontype");

const initial = {
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    cartitems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
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
      localStorage.setItem("cartItems", JSON.stringify(cartitems));
      return { ...state, cart: { ...state.cart, cartitems } };
    case REMOVE_CART_ITEM: {
      const cartitems = state.cart.cartitems.filter((el) => el._id !== payload);
      localStorage.setItem("cartItems", JSON.stringify(cartitems));
      return { ...state, cart: { ...state.cart, cartitems } };
    }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        cart: {
          shippingAddress: {},
          cartitems: [],
        },
      };
    case SHIPPING_ADDRESS_SUCCESSE:
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: payload,
        },
      };
    default:
      return state;
  }
};
