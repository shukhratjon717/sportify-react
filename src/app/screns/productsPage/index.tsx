import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Container } from "@mui/material";
import Products from "./Products";
import ChosenProduct from "./ChosenProduct";

export default function ProductsPage() {
  const products = useRouteMatch();
  console.log("products:", products);
  return (
    <div className={"products-page"}>
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct />
        </Route>
        <Route path={`${products.path}/:productId`}></Route>
        <Products />
      </Switch>
    </div>
  );
}
