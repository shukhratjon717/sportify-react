import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  shop: null,
  chosenProduct: null,
  products: [],
  brandProducts: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setshop: (state, action) => {
      state.shop = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setBrandProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setshop, setChosenProduct, setProducts, setBrandProducts } =
  productsPageSlice.actions;

const ProductPageReducer = productsPageSlice.reducer;
export default ProductPageReducer;
