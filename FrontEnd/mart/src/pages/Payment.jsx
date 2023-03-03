import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const {
    cart: { shippingAddress },
  } = useSelector((state) => state.cart);
 
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);
  return <div></div>;
}
