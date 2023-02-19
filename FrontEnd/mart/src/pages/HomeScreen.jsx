import React, { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { GetProduct } from "../Redux/product/action";
import { Link } from "react-router-dom";
import "./home.css";
export default function HomeScreen() {
  const { data, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProduct());
  }, [dispatch]);
  return (
    <div className="first">
      <h1>Featured Products</h1>
      <div className="products">
        {data?.map((el) => (
          <div className="product" key={el._id}>
            <Link to={`/product/${el.slug}`}>
              <img src={el.image} alt={el.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${el.slug}`}>
                <p>{el.name}</p>
              </Link>
              <p>
                <strong>${el.price}</strong>
              </p>
              <Button bg="blue.500" color={"white"} mt={"10px"}>
                Add To Card
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
