import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export function HomeNavbar() {
  const authMember = null;
  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          {/* <Stack className="links"> */}
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
            {/* BASKET */}

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
        {/* </Stack> */}
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-txt"}>Discover trends with Sportify</Box>
            <Box className={"wel-txt"}> The choice, not just a choice</Box>
            <Box className={"service-txt"}> 24 hours service</Box>
            <Box className={"signup"}>
              {!authMember ? (
                <Button variant={"contained"} className={"signup-button"}>
                  SIGN UP
                </Button>
              ) : null}
            </Box>
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
