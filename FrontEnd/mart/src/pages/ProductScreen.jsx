import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../component/Rating";
import { GetSingleProduct } from "../Redux/product/action";
import { Badge, Button, Text } from "@chakra-ui/react";
import "./home.css";
import { Helmet } from "react-helmet-async";
import Loading from "../component/Loading";
import Error from "../component/Error";
import { CartItme } from "../Redux/cart/action";
export default function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { data, loading, error } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSingleProduct(id));
  }, [id]);
  const AddToCardhandler = async () => {
    const ExitProduct = cart.cartitems.find((x) => x._id === data._id);
    const quantity = ExitProduct ? ExitProduct.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert("Sorry! product out of stock");
      return;
    }
    dispatch(CartItme(data, quantity));
    navigate("/cart");
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="img">
          <div>
            <img src={data.image} alt={data.name} />
          </div>
          <div className="img1">
            <Helmet>
              <title>{data.name}</title>
            </Helmet>

            <Rating rating={data.rating} numReviews={data.numReviews} />
            <p>
              <strong>Price: ${data.price}</strong>
            </p>
            <p>Description: {data.description}</p>
          </div>
          <div className="img2">
            <p>
              <strong>Price: ${data.price}</strong>
            </p>
            <Text>Status:</Text>
            {data.countInStock > 0 ? (
              <Badge variant="solid" colorScheme="green">
                In Stock
              </Badge>
            ) : (
              <Badge variant="solid" colorScheme="red" w={60}>
                Unavailable
              </Badge>
            )}
            <Button w={100} onClick={AddToCardhandler}>
              Add To Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
