import { Order } from "./order";
import { Product } from "./product";
import { User } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/**HOMEPAGE */
export interface HomePageState {
  popularProducts: Product[];
  newProducts: Product[];
}

/**PRODUCTS PAGE */
export interface ProductsPageState {
  shop: User | null;
  chosenProduct: Product | null;
  products: Product[];
  brandProducts: Product[];
}

/**ORDERS PAGE */

export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
