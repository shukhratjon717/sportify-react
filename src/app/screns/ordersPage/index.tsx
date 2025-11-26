import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  date: string; // Added for realism
  status: string; // Added for realism
}

export default function UserOrders() {
  const { authMember } = useGlobals();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authMember) navigate("/", { replace: true });
  }, [authMember, navigate]);

  useEffect(() => {
    if (authMember) {
      setLoading(true);
      // Simulate API fetch; replace with real API call (e.g., fetchOrders())
      setTimeout(() => {
        setOrders([
          {
            id: "1",
            productName: "T-Shirt",
            price: 25,
            quantity: 2,
            date: "2023-10-01",
            status: "Shipped",
          },
          {
            id: "2",
            productName: "Sneakers",
            price: 120,
            quantity: 1,
            date: "2023-09-15",
            status: "Pending",
          },
          {
            id: "3",
            productName: "Backpack",
            price: 50,
            quantity: 1,
            date: "2023-11-20",
            status: "Delivered",
          },
        ]);
        setLoading(false);
      }, 500);
    }
  }, [authMember]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, color: "var(--text-dark)" }}
      >
        Your Orders
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress color="primary" />
        </Box>
      ) : orders.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          No orders found. Start shopping to see your orders here!
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ mt: 3, boxShadow: "var(--shadow-sm)", borderRadius: 2 }}
        >
          <Table aria-label="orders table">
            <TableHead>
              <TableRow sx={{ bgcolor: "var(--bg-accent)" }}>
                <TableCell>
                  <Typography fontWeight={600}>Order ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Product</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Quantity</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:hover": { bgcolor: "#f5f5f5" },
                    transition: "background-color var(--transition)",
                  }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          order.status === "Shipped"
                            ? "green"
                            : order.status === "Pending"
                            ? "orange"
                            : "blue",
                        fontWeight: 500,
                      }}
                    >
                      {order.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
