import { useSelector } from "react-redux";

export default function OrderScreen() {
  const { order } = useSelector((state) => state.order);

  return (
    <div>
      {order && (
        <>
          <h1>{order.user.name}</h1>
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
        </>
      )}
      {order &&
        order.cartitems.map((el) => (
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
