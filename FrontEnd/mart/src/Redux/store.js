import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { CartReducer } from "./cart/reducer";
import { FilterReducer } from "./filter/reducer";
import { OrderRdeucer } from "./order/reducer";
import { UserReducer } from "./user/reducer";
const { ReducerProduct } = require("./product/reducer");

//here we are combining all the state into single state entity..
const rootReducer = combineReducers({
  product: ReducerProduct,
  cart: CartReducer,
  userInfo: UserReducer,
  order: OrderRdeucer,
  pro: FilterReducer,
});

//here by using store we providing state to all the component..
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
