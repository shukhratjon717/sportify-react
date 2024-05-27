import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";
import Products from "./Products";
import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search";
import ChosenProduct from "./ChosenProduct";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const products = useRouteMatch();
  console.log("products:", products);
  return (
    <div className={"products-page"}>
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${products.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
