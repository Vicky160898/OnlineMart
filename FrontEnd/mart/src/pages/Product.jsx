import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import Rating from "../component/Rating";
import { useDispatch, useSelector } from "react-redux";
import { CartItme } from "../Redux/cart/action";
import { BsFillHeartFill } from "react-icons/bs";
import { ProductLike } from "../Redux/product/action";
export default function Product({ el }) {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const toast = useToast();
  const { data } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const ExitProduct = cart.cartitems.find((x) => x._id === el._id);
  const quantity = ExitProduct ? ExitProduct.quantity + 1 : 1;
  const AddTohandler = async (item) => {
    if (el.countInStock < quantity) {
      toast({
        title: "Sorry! product out of stock",
        description: "",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    dispatch(CartItme(item, quantity, toast));
    toast({
      title: "Product added into cart Successfully!",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };
  const handleLike = (id) => {
    setLike(!like);
    // const updateLike = data.filter((el) =>
    //   el.id === id ? { ...el, like: !el.like } : el
    // );
    console.log(like);
    dispatch(ProductLike(id, like));
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
          {/* {like ? (
            <BsFillHeartFill
              size={22}
              bg="red"
              onClick={() => handleLike(el._id)}
            />
          ) : (
            <BsFillHeartFill
              size={22}
              bg="grey"
              onClick={() => handleLike(el._id)}
            />
          )} */}

          <p>
            <strong>${el.price}</strong>
          </p>
          {el.countInStock < quantity ? (
            <Button bg="grey" mt={"10px"} disabled>
              Out Of Stock
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
