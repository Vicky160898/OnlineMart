import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";
import ProductScreen from "../pages/ProductScreen";
export default function AllRoutes() {
  return (
    <>
      <Routes>
      <Route path="/product/:slug" element={<ProductScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </>
  );
}
