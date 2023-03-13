import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import AutoSlider from "../component/AutoSlider";
import Error from "../component/Error";
import HomeCarousel from "../component/HomeCarousel";
import Loading from "../component/Loading";
import { GetProduct } from "../Redux/product/action";
import "./home.css";
import Product from "./Product";
export default function HomeScreen() {
  const { data, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProduct());
  }, [dispatch]);
  return (
    <div className="first">
      <Helmet>
        <title>OnLineMart.in Online Shopping Center</title>
      </Helmet>
      <AutoSlider/>
      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          data?.map((el) => (
            <div key={el._id}>
              <Product el={el} />
            </div>
          ))
        )}
      </div>
      <div>
        <HomeCarousel />
      </div>
    </div>
  );
}
