import { Container } from "@mui/material";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProduts";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useEffect } from "react";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { setPopularProducts } from "./slice";
import { retrievePopularProducts } from "./selector";

/** REDUX SLICE & SELECTOR */
const actionDistatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularProducts(data)),
});
const popularProductsRetriver = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts })
);

export default function HomePage() {
  // Selector: will store the data

  const { setPopularDishes } = actionDistatch(useDispatch());
  const {popularProducts} = useSelector(popularProductsRetriver);

  useEffect(() => {}, []);

  console.log("PopularProducts:", popularProducts)

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularProducts />
      <NewProducts />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
