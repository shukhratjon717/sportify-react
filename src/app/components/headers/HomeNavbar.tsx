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
  ListItemText,
  ListItemButton,
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
  const isMobile = useMediaQuery("(max-width: 900px)");
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

  const activeStyle = { color: "#1db954", fontWeight: 700 };
  const inactiveStyle = { color: "inherit", fontWeight: 500 };

  return (
    <>
      {/* Top Navbar */}
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
                  style={{ height: 50, borderRadius: 8 }}
                />
              </NavLink>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack direction="row" spacing={5} alignItems="center">
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

                {!authMember ? (
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="outlined"
                      onClick={() => setSignupOpen(true)}
                      sx={{ borderRadius: 3 }}
                    >
                      Sign Up
                    </Button>
                    <Button
                      variant="contained"
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

            {/* Mobile Menu Icon */}
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
                    textDecoration: "none",
                    width: "100%",
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

            {/* Basket */}
            <ListItem sx={{ mt: 2 }}>
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            </ListItem>

            {/* Auth Buttons */}
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
                  >
                    Login
                  </Button>
                </ListItem>
              </>
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
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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

      {/* ⭐ NEW: Hero Section with Background Image */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 10, md: 14 },
          textAlign: "center",
          color: "white",

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/img/hero.jpg')",
          minHeight: { xs: 260, md: 420 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              fontSize: { xs: "2.7rem", md: "4.5rem" },
              mb: 2,
              textShadow: "0px 4px 15px rgba(0,0,0,0.7)",
            }}
          >
            Discover Trends with Sportify
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              opacity: 0.95,
              textShadow: "0px 3px 12px rgba(0,0,0,0.6)",
            }}
          >
            Premium Sportswear • Fast Delivery • Best Prices
          </Typography>
        </Container>
      </Box>
    </>
  );
}
