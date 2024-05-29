import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

/** State */
const initialState: HomePageState = {
  popularProducts: [],
  newProducts: [],
};
// Argument
const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    /**action */
    setPopularProducts: (state, action) => {
      state.popularProducts = action.payload;
    },
    setNewProducts: (state, action) => {
      state.newProducts = action.payload;
    },
  },
});

export const { setPopularProducts, setNewProducts } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
