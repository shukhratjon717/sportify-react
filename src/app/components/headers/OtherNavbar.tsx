import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
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

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline" : "";

  return (
    <div className="other-navbar">
      <div className="other-navbar-header">
        Use Code Sportify717 for 10% off your first order
      </div>
      <Container className="navbar-container">
        <Stack className="menu" direction="row" alignItems="center" spacing={2}>
          <Box className="brand-holder">
            <NavLink to="/">
              <img className="logo-icon" src="/img/Sportify.png" alt="Logo" />
            </NavLink>
          </Box>

          <Box className="hover-line">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
          </Box>
          <Box className="hover-line">
            <NavLink to="/products" className={getNavLinkClass}>
              Products
            </NavLink>
          </Box>
          {authMember && (
            <Box className="hover-line">
              <NavLink to="/user-page" className={getNavLinkClass}>
                My Page
              </NavLink>
            </Box>
          )}
          <Box className="hover-line">
            <NavLink to="/help" className={getNavLinkClass}>
              Help
            </NavLink>
          </Box>

          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
            onDeleteAll={onDeleteAll}
          />

          {!authMember ? (
            <Button
              variant="contained"
              className="login-button"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </Button>
          ) : (
            <img
              className="user-avatar"
              src={
                authMember?.userImage
                  ? `${serverApi}/${authMember.userImage}`
                  : "/icons/default-user.svg"
              }
              aria-haspopup="true"
              onClick={handleLogoutClick}
              style={{ cursor: "pointer" }}
            />
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseLogout}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
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
      </Container>
    </div>
  );
}
