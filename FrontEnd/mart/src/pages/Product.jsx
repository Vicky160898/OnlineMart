import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Rating from "../component/Rating";
export default function Product({ el }) {
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
          <Button bg="#f0c040" color={"white"} mt={"10px"}>
            Add To Card
          </Button>
        </div>
      </div>
    </div>
  );
}
