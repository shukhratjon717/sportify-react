import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useEffect, useState } from "react";

import { CartItem } from "../../../lib/types/search";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}
export default function HomeNavbar(props: HomeNavbarProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const authMember = null;

  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<boolean>(true);

  useEffect(() => {
    console.log("componentDidMount", count); // DATA FETCH
    setCount(count + 1);

    return () => {
      console.log("componentWillUnmount");
    };
  }, [value]);

  /** HANDLERS */

  const buttonHandler = () => {
    setValue(!value);
  };
  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className={"hover-line"}>
            <Stack>
              <img className={"logo-icon"} src="/img/Sportify.png" />
            </Stack>
          </Box>
          <Box className={"hover-line"}>
            <NavLink to="/" activeClassName={"underline"}>
              Home
            </NavLink>
          </Box>
          <Box className={"hover-line"}>
            <NavLink to="/products" activeClassName={"underline"}>
              Products
            </NavLink>
          </Box>
          {authMember ? (
            <Box className={"hover-line"}>
              <NavLink to="/orders" activeClassName={"underline"}>
                Orders
              </NavLink>
            </Box>
          ) : null}
          {authMember ? (
            <Box className={"hover-line"}>
              <NavLink to="/member-page" activeClassName={"underline"}>
                My Page
              </NavLink>
            </Box>
          ) : null}
          <Box className={"hover-line"}>
            <NavLink to="/help"> Help</NavLink>
          </Box>
          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />

          {!authMember ? (
            <Box className={"login-holder"}>
              <Button
                variant="contained"
                className="login-button"
                onClick={buttonHandler}
              >
                Get Started
              </Button>
              {/* <Button variant="contained" className="login-button">
                Login
              </Button> */}
            </Box>
          ) : (
            <img
              className="user-avatar"
              src={"/icons/default-user.svg"}
              aria-haspopup={"true"}
            />
          )}
        </Stack>
        {/* </Stack> */}
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-txt"}>Discover trends with Sportify</Box>

            <Box className={"signup"}></Box>
          </Stack>
          <Box className={"logo-holder"}>
            <Box className={"logo-frame"}>
              <div className={"logo-img"}>Collections </div>
              {/* <div className={"logo-txt"}>Make Your Dreams Come True </div> */}
            </Box>
            <Box className={"logo-img"}>
              <div className="logo-img1"> </div>
              <div className="logo-img2"></div>
              <div className="logo-img3"></div>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
