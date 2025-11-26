import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  IconButton,
  Badge,
  Menu,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlerts";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const itemsPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const shippingCost = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const orderService = new OrderService();
      await orderService.createOrder(cartItems);

      onDeleteAll();
      setOrderBuilder(new Date());
      navigate("/orders");
    } catch (err) {
      console.error(err);
      sweetErrorHandling(err);
    }
  };

  return (
    <Box className="hover-line">
      <IconButton
        aria-label="cart"
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        <Stack className="basket-frame">
          <Box className="all-check-box">
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                <div>Cart Products:</div>
                <DeleteForeverIcon
                  sx={{ cursor: "pointer" }}
                  color="primary"
                  onClick={onDeleteAll}
                />
              </Stack>
            )}
          </Box>

          <Box className="orders-main-wrapper">
            <Box className="orders-wrapper">
              {cartItems.map((item) => {
                const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box className="basket-info-box" key={item._id}>
                    <CancelIcon
                      color="primary"
                      className="cancel-btn"
                      onClick={() => onDelete(item)}
                    />
                    <img src={imagePath} className="product-img" alt={item.name} />
                    <span className="product-name">{item.name}</span>
                    <p className="product-price">
                      ${item.price} x {item.quantity}
                    </p>
                    <Box className="quantity-btns">
                      <Button onClick={() => onRemove(item)}>-</Button>
                      <Button onClick={() => onAdd(item)}>+</Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {cartItems.length !== 0 && (
            <Box className="basket-order">
              <span className="price">
                Total: ${totalPrice} ({itemsPrice} + {shippingCost})
              </span>
              <Button
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                onClick={proceedOrderHandler}
              >
                Order
              </Button>
            </Box>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
