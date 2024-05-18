import { Product } from "./product";
import { User } from "./user";

export interface AppRootState {
    homePage: HomePageState;
    // productsPage: ProductsPage
  }
  
  /**HOMEPAGE */
  export interface HomePageState {
    popularProducts: Product[];
    newProducts: Product[];
    topUser: User[];
  }
  
  /**PRODUCTS PAGE */
  
  /**ORDERS PAGE */