import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";

export function OtherNavbar() {
  const authMember = true;
  return (
    <div className="other-navbar">
      <div className="other-navbar-header">
        Use Code Sportify717for 10% discount of your first order
      </div>
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className={"brand-holder"}>
            <NavLink to={"/"}>
              {/* <img className="brand-logo" src="/icons/shopping-cart.png" /> */}
            </NavLink>
          </Box>
          <Stack className="links">
              <div className={"other-navbar-title"}>Trendy Fashion</div>
            <Box className={"hover-line"}>
              <NavLink to="/">Home</NavLink>
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
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>
            <Basket />

            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={"/icons/default-user.svg"}
                aria-haspopup={"true"}
              />
            )}
          </Stack>
        </Stack>
        <div>
          <div>
            <img className={"body-img2"} />
          </div>
          <div className={"body-title"}> 
            <p>Summer Dress</p>
          </div>
          <div>
            <img className={"body-img"} />
          </div>
        </div>
      </Container>
    </div>
  );
}
