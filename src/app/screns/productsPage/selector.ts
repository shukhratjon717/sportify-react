import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveShop = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.shop
);
export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct
);
export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products
);

export const retrieveBrandProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.brandProducts
);