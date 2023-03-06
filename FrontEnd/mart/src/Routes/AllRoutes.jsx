import React from "react";
import { Route, Routes } from "react-router-dom";
import CartScreen from "../pages/CartScreen";
import HomeScreen from "../pages/HomeScreen";
import OrderHistory from "../pages/OrderHistory";
import OrderScreen from "../pages/OrderScreen";
import Payment from "../pages/Payment";
import ProductScreen from "../pages/ProductScreen";
import ShippingScreen from "../pages/ShippingScreen";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/order" element={<OrderHistory />} />
      </Routes>
    </>
  );
}
