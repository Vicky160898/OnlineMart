import React from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Text, Button, useToast, Spacer } from "@chakra-ui/react";
import "./home.css";
import { MdDelete } from "react-icons/md";
import { CartItme, DeteleItem } from "../Redux/cart/action";
export default function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
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
    dispatch(DeteleItem(item, toast));
  };
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Text textAlign="center" fontSize={"25px"} marginBottom='20px'>
        Shopping Cart
      </Text>
      <div className="sub">
        {cart.cartitems.length === 0 ? (
          <div>
            <img src="https://www.bidzoon.com/images/emptycart.gif" alt="gif" />
            <Text textAlign={"center"}>
              Cart Is Empty <Spacer />
              <Link to="/">Go for shopping Click here......</Link>
            </Text>
          </div>
        ) : (
          <div>
            {cart.cartitems.map((el) => (
              <div key={el._id} className="cart">
                <img src={el.image} alt={el.name} />
                <Link to={`/product/${el._id}`}>
                  <p>{el.name}</p>
                </Link>
                <div className="btn">
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
                </div>
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
        {cart.cartitems.length > 0 ? (
          <div className="total">
            <Text size={"25px"}>OnLine.In</Text>
            Subtotal ({cart.cartitems.reduce((a, c) => a + c.quantity, 0)}{" "}
            items) : $
            {cart.cartitems.reduce((a, c) => a + c.price * c.quantity, 0)}
            <Button
              disabled={cart.cartitems.length === 0}
              onClick={checkoutHandler}
              backgroundColor="#ffc000"
            >
              Buy Now
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
