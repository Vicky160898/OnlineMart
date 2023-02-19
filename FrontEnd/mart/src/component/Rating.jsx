import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
export default function Rating({ rating, numReviews }) {
  return (
    <div className="rating">
      <span>
        {rating >= 1 ? (
          <BsFillStarFill size={"20px"}/>
        ) : rating >= 0.5 ? (
          <FaStarHalfAlt size={"20px"}/>
        ) : (
          <FiStar size={"20px"} />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <BsFillStarFill size={"20px"} />
        ) : rating >= 1.5 ? (
          <FaStarHalfAlt size={"20px"} />
        ) : (
          <FiStar size={"20px"}/>
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <BsFillStarFill size={"20px"} />
        ) : rating >= 2.5 ? (
          <FaStarHalfAlt size={"20px"}/>
        ) : (
          <FiStar size={"20px"}/>
        )}
      </span>

      <span>
        {rating >= 4 ? (
          <BsFillStarFill size={"20px"}/>
        ) : rating >= 3.5 ? (
          <FaStarHalfAlt size={"20px"}/>
        ) : (
          <FiStar size={"20px"}/>
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <BsFillStarFill size={"20px"}/>
        ) : rating >= 4.5 ? (
          <FaStarHalfAlt size={"20px"}/>
        ) : (
          <FiStar size={"20px"}/>
        )}
      </span>
      <div>
        <span>{numReviews}  Reviews</span>
      </div>
    </div>
  );
}
