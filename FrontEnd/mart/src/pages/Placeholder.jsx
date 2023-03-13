import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button bg="red">Preview Order</Button>
      </div>

      <div>
        {cartitems?.map((el) => (
          <div key={el._id} className="product01">
            <img src={el.image} alt={el.name} />
            <p>Product Name :- {el.name}</p>
            <p>Quantity :- {el.quantity}</p>
            <Button>Price :- ${el.price}</Button>
            <Link to={"/cart"}>
              <Button bg="#f0c040" color={"white"}>
                Edit
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <div className="product01">
        <p>Shipping Details</p>
        <p>Address :- {shippingAddress.address}</p>
        <p>City :- {shippingAddress.city}</p>
        <p>Country :- {shippingAddress.country}</p>
        <p>Code :- {shippingAddress.code}</p>
        <Link to={"/shipping"}>
          <Button bg="#f0c040" color={"white"}>
            Edit
          </Button>
        </Link>
      </div>
      <div className="product01">
        <p>Order Summary</p>
        <Button>Amount :- ${finalValue.toFixed(2)}</Button>
        <Button>
          {finalValue > 100
            ? `Delivery Charges :- ${50}`
            : "Free Delivery :- 00"}
        </Button>
        <Button>GST :- ${((18 * finalValue) / 100).toFixed(2)}</Button>
        <Button>Total Amount :- ${value}</Button>
        <Button onClick={() => Payment(value)} bg="#f0c040" color={"white"}>
          Pay Now
        </Button>
      </div>
      <br />
      <br />
    </div>
  );
}
