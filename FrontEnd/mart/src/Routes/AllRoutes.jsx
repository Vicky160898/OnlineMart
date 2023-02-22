import React from "react";
import { Route, Routes } from "react-router-dom";
import CartScreen from "../pages/CartScreen";
import HomeScreen from "../pages/HomeScreen";
import ProductScreen from "../pages/ProductScreen";
import ShippingScreen from "../pages/ShippingScreen";
import { Signin } from "../pages/Signin";
export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/shipping" element={<ShippingScreen />} />
      </Routes>
    </>
  );
}
