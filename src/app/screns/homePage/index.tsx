import { Container } from "@mui/material";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProduts";
import Advertisement from "./Advertisement";
import Events from "./Events";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { setNewProducts, setPopularProducts, setTopUsers } from "./slice";
import { retrievePopularProducts } from "./selector";
import {
  ProductCollection,
  ProductType,
} from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import "../../../css/home.css";
import { User } from "../../../lib/types/user";
import ActiveUsers from "./ActiveUsers";

/** REDUX SLICE & SELECTOR */
const actionDistatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: User[]) => dispatch(setTopUsers(data)),

});
const popularProductsRetriver = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts })
);

export default function HomePage() {
  const { setPopularProducts, setNewProducts } = actionDistatch(useDispatch());

  useEffect(() => {
    // bacend server data fetchb => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.SET,
      })
      .then((data) => setPopularProducts(data))
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productType: ProductType.SET,
      })
      .then((data) => setNewProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularProducts />
      <NewProducts />
      <ActiveUsers />
      <Advertisement />
      <Events />
    </div>
  );
}


