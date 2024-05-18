import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularProducts
);
export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newProducts
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers
);
