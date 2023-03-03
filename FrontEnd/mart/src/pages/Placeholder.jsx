import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Placeholder({
  shippingAddress,
  cartitems,
  finalValue,
  Payment,
}) {
  let value =
    finalValue > 100
      ? 50 +
        (Number(finalValue.toFixed(2)) +
          Number(((18 * finalValue) / 100).toFixed(2)))
      : Number(finalValue.toFixed(2)) +
        Number(((18 * finalValue) / 100).toFixed(2));
  return (
    <div>
      <div>
        <p>Shipping</p>
        <p>Address :- {shippingAddress.address}</p>
        <p>City :- {shippingAddress.city}</p>
        <p>Country :- {shippingAddress.country}</p>
        <p>Code :- {shippingAddress.code}</p>
        <Link to={"/shipping"}>
          <Button>Edit</Button>
        </Link>
      </div>
      <div>
        <p>Payment</p>
        <p>Method : Razorpay</p>
      </div>
      <div>
        <p>Items</p>
        {cartitems?.map((el) => (
          <div key={el._id}>
            <img src={el.image} alt={el.name} />
            <p>Product Name :- {el.name}</p>
            <p>Quantity :- {el.quantity}</p>
            <p>Price :- ${el.price}</p>
            <Link to={"/cart"}>
              <Button>Edit</Button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <p>Order Summary</p>
        <p>Amount :- ${finalValue.toFixed(2)}</p>
        <p>
          {finalValue > 100
            ? `Delivery Charges :- ${50}`
            : "Free Delivery :- 00"}
        </p>
        <p>GST :- ${((18 * finalValue) / 100).toFixed(2)}</p>
        <p>Total Amount :- ${value}</p>
        <Button onClick={() => Payment(value)}>Pay Now</Button>
      </div>
    </div>
  );
}
