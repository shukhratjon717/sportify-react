import { Product } from "./product";
import { User } from "./user";

export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState
  }
  
  /**HOMEPAGE */
  export interface HomePageState {
    popularProducts: Product[];
    newProducts: Product[];
    topUsers: User[];
  }
  
/**PRODUCTS PAGE */
export interface ProductsPageState {
  shop: User | null;
  chosenProduct: Product| null;
  products: Product[];
  brandProducts: Product[];
}
  
  /**ORDERS PAGE */