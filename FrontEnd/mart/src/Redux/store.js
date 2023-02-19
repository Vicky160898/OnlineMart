import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const { ReducerProduct } = require("./product/reducer");

//here we are combining all the state into single state entity..
const rootReducer = combineReducers({
  product: ReducerProduct,
});

//here by using store we providing state to all the component..
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
