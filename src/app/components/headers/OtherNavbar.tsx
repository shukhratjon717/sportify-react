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
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout,
  Home,
  Category,
  Help,
  Person,
  Receipt,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "Products", path: "/products", icon: <Category /> },
    ...(authMember
      ? [
          { label: "Orders", path: "/orders", icon: <Receipt /> },
          { label: "My Page", path: "/user-page", icon: <Person /> },
        ]
      : []),
    { label: "Help", path: "/help", icon: <Help /> },
  ];

  const avatarSrc = authMember?.userImage
    ? `${serverApi}/${authMember.userImage}`
    : "/icons/default-user.svg";

  const activeStyle = {
    color: theme.palette.primary.main,
    fontWeight: 700,
    textDecoration: "none",
  };
  const inactiveStyle = {
    color: theme.palette.text.primary,
    fontWeight: 500,
    textDecoration: "none",
    transition: "color 0.2s",
  };

  return (
    <>
      {/* Promo Bar */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #2ecc71 0%, #27ae60 100%)",
          color: "white",
          py: 0.5,
          textAlign: "center",
          fontSize: "0.85rem",
          fontWeight: 600,
        }}
      >
        <Container>
          Free shipping on orders over $100! 🚀
        </Container>
      </Box>

      {/* Main Navbar */}
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NavLink to="/">
                <img
                  src="/img/Sportify.png"
                  alt="Sportify Logo"
                  style={{ height: 45, borderRadius: 8 }}
                />
              </NavLink>
            </Box>

            {/* Desktop Navigation */}
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
                    <Typography
                      variant="body1"
                      sx={{
                        "&:hover": { color: theme.palette.primary.main },
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.label}
                    </Typography>
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
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={() => setLoginOpen(true)}
                      sx={{ fontWeight: 600 }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setSignupOpen(true)}
                      sx={{
                        borderRadius: "50px",
                        px: 3,
                        boxShadow: "0 4px 14px 0 rgba(46, 204, 113, 0.4)",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                ) : (
                  <IconButton onClick={handleLogoutClick} sx={{ p: 0 }}>
                    <Avatar
                      src={avatarSrc}
                      alt={authMember.userNick}
                      sx={{ width: 40, height: 40, border: "2px solid #2ecc71" }}
                    />
                  </IconButton>
                )}
              </Stack>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                size="large"
                color="inherit"
              >
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
        PaperProps={{
          sx: {
            width: 280,
            background: "#ffffff",
            borderLeft: "1px solid rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <img src="/img/Sportify.png" alt="Logo" style={{ height: 35 }} />
            <IconButton onClick={() => setMobileMenuOpen(false)} size="large">
              ×
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <NavLink
                  to={item.path}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    color: "inherit",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <ListItemButton
                      selected={isActive}
                      sx={{
                        borderRadius: 2,
                        "&.Mui-selected": {
                          bgcolor: "rgba(46, 204, 113, 0.15)",
                          color: "#2ecc71",
                          "& .MuiListItemIcon-root": { color: "#2ecc71" },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItemButton>
                  )}
                </NavLink>
              </ListItem>
            ))}

            <ListItem sx={{ mt: 2 }}>
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            </ListItem>

            {!authMember ? (
              <Box sx={{ mt: 3, px: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSignupOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  sx={{ mb: 2 }}
                >
                  Sign Up
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <ListItem sx={{ mt: 3 }}>
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
            mt: 1,
            borderRadius: 2,
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            "& .MuiMenuItem-root": {
              py: 1.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleLogoutRequest}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "text.secondary" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
