// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import HomePageReducer from "./screns/homePage/slice";
// import ProductPageReducer from "./screns/productsPage/slice";
// import OrdersPageReducer from "./screns/ordersPage/slice";

// export const store = configureStore({
//   middleware: (getDefaultMiddleware) =>
//     //@ts-ignore
//     getDefaultMiddleware().concat(reduxLogger),
//   reducer: {
//     homePage: HomePageReducer,
//     productsPage: ProductPageReducer,
//     ordersPage: OrdersPageReducer,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger"; // Import redux-logger
import HomePageReducer from "./screns/homePage/slice";
import ProductPageReducer from "./screns/productsPage/slice";
import OrdersPageReducer from "./screns/ordersPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    //@ts-ignore
    getDefaultMiddleware().concat(logger), // Use the imported logger
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductPageReducer,
    ordersPage: OrdersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
