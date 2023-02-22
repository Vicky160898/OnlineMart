import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../component/Rating";
import { GetSingleProduct } from "../Redux/product/action";
import { Badge, Button, Text, HStack } from "@chakra-ui/react";
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
  }, [dispatch, id]);
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
            <HStack ml={30} gap="10px">
              <Text>Name :</Text>
              <Text fontSize={18}>{data.name}</Text>
            </HStack>
            <Rating rating={data.rating} numReviews={data.numReviews} />
            <HStack ml={25} gap="35px">
              <Text>Price :</Text>
              <Badge p={1} w={36} fontSize={17}>
                ${data.price}
              </Badge>
            </HStack>
            <p>Description: {data.description}</p>
          </div>
          <div className="img2">
            <HStack ml={25} gap="38px">
              <Text>Price:</Text>
              <Badge p={1} w={40} fontSize={18}>
                ${data.price}
              </Badge>
            </HStack>
            <HStack ml={25} gap="25px">
              <Text size={30}>Status :</Text>
              {data.countInStock > 0 ? (
                <Badge variant="solid" colorScheme="green" p={2} w={40}>
                  In Stock
                </Badge>
              ) : (
                <Badge variant="solid" colorScheme="red" p={2} w={40}>
                  Unavailable
                </Badge>
              )}
            </HStack>
            <Button
              w={220}
              onClick={AddToCardhandler}
              display="block"
              m={"auto"}
              mt="5px"
              bg="#f0c040"
              color={"white"}
            >
              Add To Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
