import { createSlice } from "@reduxjs/toolkit";
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
    setShop: (state, action) => {
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

export const { setShop, setChosenProduct, setProducts, setBrandProducts } =
  productsPageSlice.actions;

const ProductPageReducer = productsPageSlice.reducer;
export default ProductPageReducer;
