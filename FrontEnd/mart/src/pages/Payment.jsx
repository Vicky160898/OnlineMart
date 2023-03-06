import { Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlaceOrder } from "../Redux/order/action";
import Placeholder from "./Placeholder";

export default function Payment() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const {
    cart: { shippingAddress, cartitems },
    cart,
  } = useSelector((state) => state.cart);
  let finalValue = cart.cartitems.reduce((a, c) => a + c.price * c.quantity, 0);
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const handleRazorpay = (order) => {
    const option = {
      key: "rzp_test_tcbbwJBuwVwpT3",
      amount: order.amount,
      currency: order.currency,
      name: "Product Payment",
      description: "test transaction",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/Zee5-official-logo.jpeg",
      order_id: order.id,
      handler: function (response) {
        let x = {
          shippingAddress: shippingAddress,
          cartitems: cartitems,
          amount: order.amount,
        };
        axios
          .post(
            "http://localhost:8080/verify",
            { ...response, ...x },
            { headers: { authorization: `Bearer ${user.token}` } }
          )
          .then((res) => {
            toast({
              title: "Your Order Placed by OnLineMart.in",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            localStorage.removeItem("cartItems");
            // your orders succeful redirect to home page
            dispatch(PlaceOrder(res.data._id, user));
            setTimeout(() => {
              navigate(`/order/${res.data._id}`);
            }, 3000);
            return;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };

    const rzp = new window.Razorpay(option);
    rzp.open();
  };

  const Payment = (amount) => {
    const data = { amount: amount };
    axios
      .post("http://localhost:8080/orders", data)
      .then((res) => {
        handleRazorpay(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Text>Preview Order</Text>
      <Placeholder
        shippingAddress={shippingAddress}
        cartitems={cartitems}
        finalValue={finalValue}
        Payment={Payment}
      />
    </div>
  );
}
