import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import "../../../css/products.css";
import Products from "./Products";

export default function ProductsPage() {
  const products = useRouteMatch();
  console.log("products:", products);
  return (
    <div className={"products-page"}>
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct />
        </Route>
        <Route path={`${products.path}`}></Route>
        <Products />
      </Switch>
    </div>
  );
}
