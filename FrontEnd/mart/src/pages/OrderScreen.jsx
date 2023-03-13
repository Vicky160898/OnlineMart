import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "./home.css";
export default function OrderScreen() {
  const { order } = useSelector((state) => state.order);

  return (
    <div>
      {order && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                margin: "auto",
              }}
            >
              <h1
                style={{
                  fontSize: "22px",
                }}
              >
                Account Holder Name:- {order.user.name}
              </h1>
              <h1
                style={{
                  fontSize: "22px",
                }}
              >
                Buyer Name:- {order.shippingAddress.name}
              </h1>
            </div>
          </div>

          <div className="product01">
            <h1>Address :- {order.shippingAddress.address}</h1>
            <h1>City :- {order.shippingAddress.city}</h1>
            <h1>Country :- {order.shippingAddress.country}</h1>
            <h1>PostalCode :- {order.shippingAddress.code}</h1>
          </div>
          <div className="product01">
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
          <div key={el._id} className="product01">
            <h1>Order Summary</h1>
            <img src={el.image} alt={el.name} />
            <h1>Name :- {el.name}</h1>
            <h1>Price :- {el.price}</h1>
            <h1>Quantity :- {el.quantity}</h1>
          </div>
        ))}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <img
          src="https://thenewdaily.com.au/wp-content/uploads/2020/08/food-delivery.gif"
          alt="delivery"
          width={"20%"}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      >
        <Text>Your Order Deliver Soon...</Text>
        <Text>Thank You For Shopping!</Text>
      </div>
    </div>
  );
}
