import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Rating from "../component/Rating";
import { useDispatch, useSelector } from "react-redux";
import { CartItme } from "../Redux/cart/action";
export default function Product({ el }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const AddTohandler = async (item) => {
    const ExitProduct = cart.cartitems.find((x) => x._id === el._id);
    const quantity = ExitProduct ? ExitProduct.quantity + 1 : 1;
    if (el.countInStock < quantity) {
      window.alert("Sorry! product out of stock");
      return;
    }
    dispatch(CartItme(item, quantity));
  };

  return (
    <div>
      <div className="product">
        <Link to={`/product/${el._id}`}>
          <img src={el.image} alt={el.name} />
        </Link>
        <div className="product-info">
          <Link to={`/product/${el._id}`}>
            <p>{el.name}</p>
          </Link>
          <Rating rating={el.rating} numReviews={el.numReviews} />
          <p>
            <strong>${el.price}</strong>
          </p>
          {el.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button
              bg="#f0c040"
              color={"white"}
              mt={"10px"}
              onClick={() => AddTohandler(el)}
            >
              Add To Card
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
