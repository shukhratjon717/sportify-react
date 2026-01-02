import { Box, Container, Stack } from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import OrderService from "../../services/OrderService";
import { OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
} from "./slice";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

export default function UserOrders() {
  const { authMember, orderBuilder } = useGlobals();
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (!authMember) navigate("/", { replace: true });
  }, [authMember, navigate]);

  useEffect(() => {
    const order = new OrderService();

    // Fetch Paused Orders
    const pausedInquiry: OrderInquiry = {
      page: 1,
      limit: 10,
      orderStatus: OrderStatus.PAUSE,
    };
    order
      .getMyOrders(pausedInquiry)
      .then((data) => dispatch(setPausedOrders(data)))
      .catch((err) => console.log(err));

    // Fetch Process Orders
    const processInquiry: OrderInquiry = {
      page: 1,
      limit: 10,
      orderStatus: OrderStatus.PROCESS,
    };
    order
      .getMyOrders(processInquiry)
      .then((data) => dispatch(setProcessOrders(data)))
      .catch((err) => console.log(err));

    // Fetch Finished Orders
    const finishedInquiry: OrderInquiry = {
      page: 1,
      limit: 10,
      orderStatus: OrderStatus.FINISH,
    };
    order
      .getMyOrders(finishedInquiry)
      .then((data) => dispatch(setFinishedOrders(data)))
      .catch((err) => console.log(err));
  }, [authMember, orderBuilder, dispatch]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box
        sx={{
          mb: 4,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
            padding: "12px 32px",
            borderRadius: "50px",
            boxShadow: "0 8px 24px rgba(46, 204, 113, 0.25)",
            mb: 2,
          }}
        >
          <Box
            sx={{
              fontSize: "32px",
            }}
          >
            📦
          </Box>
          <Box
            sx={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.5px",
            }}
          >
            My Orders
          </Box>
        </Box>
        <Box
          sx={{
            fontSize: "15px",
            color: "#7f8c8d",
            fontWeight: 500,
          }}
        >
          Track and manage all your orders in one place
        </Box>
      </Box>

      <Stack className="order-page">
        <TabContext value={value}>
          <Box className="order-nav-frame">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="order tabs"
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "16px",
                    minWidth: 120,
                  },
                  "& .Mui-selected": {
                    color: "primary.main",
                  },
                }}
              >
                <Tab label="Paused Orders" value="1" />
                <Tab label="Process Orders" value="2" />
                <Tab label="Finished Orders" value="3" />
              </TabList>
            </Box>
          </Box>

          <Stack className="order-main-content">
            <PausedOrders setValue={setValue} />
            <ProcessOrders setValue={setValue} />
            <FinishedOrders />
          </Stack>
        </TabContext>
      </Stack>
    </Container>
  );
}
