import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import Products from "./Products";
import ChosenProduct from "./ChosenProduct";
import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const match = useMatch("/products/*"); // matches "/products" and nested routes

  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ChosenProduct onAdd={onAdd} />} />
        <Route path="" element={<Products onAdd={onAdd} />} />
      </Routes>
    </div>
  );
}
