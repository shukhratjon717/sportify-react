import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout,
  Home,
  Category,
  Help,
  Person,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
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
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Products", path: "/products", icon: <Category /> },
    ...(authMember
      ? [{ label: "My Page", path: "/user-page", icon: <Person /> }]
      : []),
    { label: "Help", path: "/help", icon: <Help /> },
  ];

  const avatarSrc = authMember?.userImage
    ? `${serverApi}/${authMember.userImage}`
    : "/icons/default-user.svg";

  const activeStyle = { color: "#1db954", fontWeight: 700 };
  const inactiveStyle = { color: "inherit", fontWeight: 500 };

  return (
    <>
      {/* Top Promo Bar */}
      <Box
        sx={{
          bgcolor: "#1db954",
          color: "white",
          textAlign: "center",
          py: 1,
          fontSize: { xs: "0.85rem", sm: "1rem" },
          fontWeight: 600,
        }}
      >
        Use Code <strong>Sportify717</strong> for 10% off your first order
      </Box>

      {/* Main Navbar */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ bgcolor: "#fff", py: 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box>
              <NavLink to="/">
                <img
                  src="/img/Sportify.png"
                  alt="Sportify Logo"
                  style={{ height: 48, borderRadius: 8 }}
                />
              </NavLink>
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <Stack direction="row" spacing={4} alignItems="center">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    style={({ isActive }) =>
                      isActive ? activeStyle : inactiveStyle
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <Basket
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  onDeleteAll={onDeleteAll}
                />

                {/* Auth Section */}
                {!authMember ? (
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setSignupOpen(true)}
                      sx={{ borderRadius: 3 }}
                    >
                      Sign Up
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setLoginOpen(true)}
                      sx={{ borderRadius: 3 }}
                    >
                      Login
                    </Button>
                  </Stack>
                ) : (
                  <IconButton onClick={handleLogoutClick}>
                    <Avatar src={avatarSrc} alt={authMember.userNick} />
                  </IconButton>
                )}
              </Stack>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton onClick={() => setMobileMenuOpen(true)} size="large">
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { width: 300 } }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <img src="/img/Sportify.png" alt="Logo" style={{ height: 40 }} />
            <IconButton onClick={() => setMobileMenuOpen(false)} size="large">
              ×
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <NavLink
                  to={item.path}
                  style={{
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <ListItemButton
                      selected={isActive}
                      sx={{ borderRadius: 2 }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
            ))}

            <ListItem disablePadding sx={{ mt: 2 }}>
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            </ListItem>

            {!authMember ? (
              <>
                <ListItem>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setSignupOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    sx={{ mt: 2 }}
                  >
                    Sign Up
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      setLoginOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    sx={{ mt: 1 }}
                  >
                    Login
                  </Button>
                </ListItem>
              </>
            ) : (
              <ListItem sx={{ mt: 3, alignItems: "center" }}>
                <Avatar src={avatarSrc} sx={{ mr: 2 }} />
                <Typography fontWeight="bold">{authMember.userNick}</Typography>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Logout Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseLogout}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            borderRadius: 2,
            "& .MuiMenuItem-root": {
              py: 1.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleLogoutRequest}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
