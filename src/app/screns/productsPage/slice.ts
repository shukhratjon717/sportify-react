import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  shop: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.shop = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setRestaurant, setChosenProduct, setProducts } =
  productsPageSlice.actions;

  const ProductPageReducer = productsPageSlice.reducer;
  export default ProductPageReducer;
