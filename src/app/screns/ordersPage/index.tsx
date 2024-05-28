import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import "../../../css/order.css";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order } from "../../../lib/types/order";

/** REDUX SLICE & SELECTOR */
const actionDistatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDistatch(useDispatch());
  const [value, setValue] = useState("1");

  /**HANDLERS */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        {" "}
        <Stack className="order-left">
          <TabContext value={value}>
            {" "}
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                {" "}
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  {" "}
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>{" "}
              </Box>
            </Box>
            <Stack className={" order-main-content"}>
              {" "}
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>{" "}
          </TabContext>
        </Stack>
        <Stack className={"order-right"}>
          {" "}
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              {" "}
              <div className={"order-user-img"}>
                <img
                  src={"/icons/default-user.svg"}
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  {" "}
                  <img
                    src={"/icons/user-badge.svg"}
                    className={"order-user-prof-img"}
                  />{" "}
                </div>
              </div>{" "}
              <span className={"order-user-name"}>Steve</span>
              <span className={"order-user-prof"}>User</span>{" "}
            </Box>
            <Box className={"liner"}></Box>{" "}
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
                {" "}
                <LocationOnIcon />
              </div>{" "}
              <div className={"spec-address-txt"}>South Korea, Seoul</div>
            </Box>{" "}
          </Box>
          <Box className={"order-info-box"} sx={{ mt: "15px" }}>
            <input
              type={"text"}
              name={"card_number"}
              placeholder={"Card number :**** 4090 2002 7495"}
              className={"card-input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <input
                type={"text"}
                name={"card_period"}
                placeholder={"07 / 24"}
                className={"card-half-input"}
              />{" "}
              <input
                type={"text"}
                name={"card_cvv"}
                placeholder={"CVV : 010"}
                className={"card-half-input"}
              />{" "}
            </div>
            <input
              type={"text"}
              name={"card_creator"}
              placeholder={"Jacob McCarty"}
              className={"card-input"}
            />
            <div className={"cards-box"}>
              {" "}
              <img src={"/icons/western-card.svg"} />
              <img src={"/icons/master-card.svg"} />{" "}
              <img src={"/icons/paypal-card.svg"} />
              <img src={"/icons/visa-card.svg"} />{" "}
            </div>
          </Box>{" "}
        </Stack>
      </Container>{" "}
    </div>
  );
}
