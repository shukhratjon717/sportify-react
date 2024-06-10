import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack direction="row" className="menu" spacing={2} alignItems="center">
          <Box className="hover-line">
            <Stack>
              <img className="logo-icon" src="/img/Sportify.png" alt="Logo" />
            </Stack>
          </Box>
          <Box className="hover-line">
            <NavLink to="/" activeClassName="underline">
              Home
            </NavLink>
          </Box>
          <Box className="hover-line">
            <NavLink to="/products" activeClassName="underline">
              Products
            </NavLink>
          </Box>
          {authMember && (
            <>
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
              <Box className="hover-line">
                <NavLink to="/user-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            </>
          )}
          <Box className="hover-line">
            <NavLink to="/help">Help</NavLink>
          </Box>
          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />
          {!authMember ? (
            <Box className="login-holder" display="flex">
              <Box className="signup">
                <Button
                  variant="contained"
                  className="signup-button"
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              </Box>
              <Button
                variant="contained"
                className="login-button"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
            </Box>
          ) : (
            <img
              className="user-avatar"
              src={
                authMember?.userImage
                  ? `${serverApi}/${authMember?.userImage}`
                  : "/icons/default-user.svg"
              }
              alt="User Avatar"
              aria-haspopup="true"
              onClick={handleLogoutClick}
            />
          )}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleCloseLogout}
            onClick={handleCloseLogout}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogoutRequest}>
              <ListItemIcon>
                <Logout fontSize="small" style={{ color: "blue" }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
        <Stack className="header-frame">
          <Stack className="detail">
            <Box className="head-main-txt">Discover trends with Sportify</Box>
          </Stack>
          <Box className="logo-holder">
            <Box className="logo-frame">
              <div className="logo-img">Collections </div>
            </Box>
            <Box className="logo-img">
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
