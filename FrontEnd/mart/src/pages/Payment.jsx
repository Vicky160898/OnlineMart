import { Button, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FinalOrder, PlaceOrder } from "../Redux/order/action";
import Placeholder from "./Placeholder";

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  console.log(order);
  const toast = useToast();
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
    console.log(order)
    const option = {
      key: "rzp_test_tcbbwJBuwVwpT3",
      amount:order.amount,
      currency: order.currency,
      name: "Product Payment",
      description: "test transaction",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5a/Zee5-official-logo.jpeg",
      order_id: order.id,
      handler: function (response) {
        alert("Your Payment Successful");
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        let x = { response: response };
        dispatch(FinalOrder(x));
        // axios
        //   .post("https://vowelweb-in.onrender.com/verify", {
        //     response: response,
        //   })
        //   .then((res) => {
        //     toast({
        //       title: "Your Order Placed by VowelWeb.in",
        //       status: "success",
        //       duration: 3000,
        //       isClosable: true,
        //       position: "top",
        //     });
        //     // your orders succeful redirect to home page
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      },
    };

    const rzp = new window.Razorpay(option);
    rzp.open();
  };
 
  const Payment = (amount) => {
    const data = { amount: amount };
    dispatch(PlaceOrder(data, toast));
    handleRazorpay(order);
    // axios
    //   .post("https://vowelweb-in.onrender.com/orders", data)
    //   .then((res) => {
    //     console.log(res.data, "29");
    //     handleRazorpay(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
