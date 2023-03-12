import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Rating from "../component/Rating";
import { FetchData } from "../Redux/filter/action";
import DisplayScreen from "./DisplayScreen";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
  {
    name: "$501 to $1000",
    value: "501-1000",
  },
];

const ratings = [
  {
    name: "4stars & up",
    value: 4,
  },
  {
    name: "4stars & up",
    value: 3,
  },
  {
    name: "4stars & up",
    value: 2,
  },
  {
    name: "1stars & up",
    value: 1,
  },
];

export default function SearchScreen() {
  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  const { d }= useSearchParams();
  console.log(d)
  const { search } = useLocation();
  const sp = new URLSearchParams(search); //search?category=shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "all";
  const page = sp.get("page") || 1;
  const getData = async (category, query, price, rating, order, page) => {
    try {
      let res = await axios.get(
        `http://localhost:8080/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
      );
      setState(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData(category, query, price, rating, order, page);
  }, [category, query, price, rating, order, page]);
  console.log(state);
  const getFilter = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.page || rating;
    const filterPrice = filter.page || price;
    const filterOrder = filter.page || order;

    return `http://localhost:8080/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>

      <div>
        <h1>Department</h1>
        <div>
          <ul>
            <li>
              <Link to={getFilter({ category: "all" })}>Any</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1>Avg. Customer Review</h1>
          <ul>
            {ratings?.map((r, index) => (
              <li key={index}>
                <Link to={getFilter({ rating: r.rating })}>
                  <Rating caption={" & up"} rating={r.rating} />
                </Link>
              </li>
            ))}
            <li>
              <Link to={getFilter({ category: "all" })}>Any</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1>Price</h1>
          <ul>
            {prices?.map((p) => (
              <li key={p.name}>
                <Link to={getFilter({ price: p.rating })}>{p.name}</Link>
              </li>
            ))}
            <li>
              <Link to={getFilter({ price: "all" })}>Any</Link>
            </li>
          </ul>
        </div>
        <DisplayScreen />
      </div>
    </div>
  );
}
