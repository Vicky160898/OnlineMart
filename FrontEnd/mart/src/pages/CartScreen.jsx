import React from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Text, Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
export default function CartScreen() {
  const { cart } = useSelector((state) => state.cart);
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <div>
        {cart.cartitems.length === 0 ? (
          <Text>
            cart is empty..<Link to="/">Go shopping</Link>
          </Text>
        ) : (
          <div>
            {cart.cartitems.map((el) => (
              <div key={el._id}>
                <img src={el.image} alt={el.name} />{" "}
                <Link to={`/product/${el._id}`}>
                  <p>{el.name}</p>
                </Link>
                <Button disabled={el.quantity === 1}>-</Button>
                <Button>{el.quantity}</Button>
                <Button disabled={el.quantity === el.countInStock}>+</Button>
                <Button>${el.price}</Button>
                <MdDelete />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        Subtotal ({cart.cartitems.reduce((a, c) => a + c.quantity, 0)} items):$(
        {cart.cartitems.reduce((a, c) => a + c.price * c.quantity, 0)})
      </div>
      <div>
        <Button disabled={cart.cartitems.length === 0}>
          process to checkout
        </Button>
      </div>
    </div>
  );
}
