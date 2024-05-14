import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link, Route, Switch, useLocation } from "react-router-dom";


import { HomeNavbar } from "./components/headers/HomeNavbar";
import { OtherNavbar } from "./components/headers/OtherNavbar";
import { Footer } from "./components/footer";
import { ProductsPage } from "./screns/productsPage";
import { OrdersPage } from "./screns/ordersPage";
import { UserPage } from "./screns/userPage";
import { HomePage } from "./screns/homePage";

function App() {
  const location = useLocation();
  return (
    <div>
      <nav>
        <ul>
        <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/products">ProductsPage</Link>
          </li>
          <li>
            <Link to="/orders">OrdersPage</Link>
          </li>
          <li>
            <Link to="/member-page">UserPage</Link>
          </li>
        </ul>
      </nav>
    {location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>}
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
