import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PlaceOrder } from "../Redux/order/action";

export default function OrderScreen() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userInfo);
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.order);
  console.log(order);
  useEffect(() => {
    dispatch(PlaceOrder(orderId, user));
    if (!user) {
      return navigate("/login");
    }
  }, [navigate, user, orderId, dispatch]);
  return (
    <div>
      <h1>{order.shippingAddress.name}</h1>
      <div>
        <h1>Address :- {order.shippingAddress.address}</h1>
        <h1>City :- {order.shippingAddress.city}</h1>
        <h1>Country :- {order.shippingAddress.country}</h1>
        <h1>PostalCode :- {order.shippingAddress.code}</h1>
      </div>
      <div>
        <h1>Payment Details</h1>
        <h1>Order_id :- {order.razorpay_order_id}</h1>
        <h1>Payment_id :- {order.razorpay_payment_id}</h1>
        <h1>CreatedAt :- {order.createdAt}</h1>
        <h1>UpdatedAt :- {order.updatedAt}</h1>
        <h1>Amount :- {order.amount / 100}</h1>
      </div>
      {order.cartitems.map((el) => (
        <div key={el._id}>
          <h1>Order Summary</h1>
          <img src={el.image} alt={el.name} />
          <h1>Name :- {el.name}</h1>
          <h1>Price :- {el.price}</h1>
          <h1>Quantity :- {el.quantity}</h1>
        </div>
      ))}
    </div>
  );
}
