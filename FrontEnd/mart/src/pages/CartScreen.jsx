import React from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Text, Button } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { CartItme, DeteleItem } from "../Redux/cart/action";
export default function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const updateCartItem = (item, quantity) => {
    if (data.countInStock < quantity) {
      window.alert("Sorry! product out of stock");
      return;
    }
    dispatch(CartItme(item, quantity));
  };
  const deleteCartItem = (item) => {
    dispatch(DeteleItem(item));
  };
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
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
                <Button
                  disabled={el.quantity === 1}
                  onClick={() => updateCartItem(el, el.quantity - 1)}
                >
                  -
                </Button>
                <Button>{el.quantity}</Button>
                <Button
                  disabled={el.quantity === el.countInStock}
                  onClick={() => updateCartItem(el, el.quantity + 1)}
                >
                  +
                </Button>
                <Button>${el.price}</Button>
                <MdDelete
                  size={40}
                  cursor="pointer"
                  onClick={() => deleteCartItem(el._id)}
                />
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
        <Button
          disabled={cart.cartitems.length === 0}
          onClick={checkoutHandler}
        >
          process to checkout
        </Button>
      </div>
    </div>
  );
}
