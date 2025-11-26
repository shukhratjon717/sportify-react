import React, { useEffect } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "../../../css/userPage.css";
import { Settings } from "./Settings";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { UserType } from "../../../lib/enums/user.enum";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const navigate = useNavigate();
  const { authMember } = useGlobals();

  useEffect(() => {
    if (!authMember) navigate("/", { replace: true });
  }, [authMember, navigate]);

  if (!authMember) return null;

  return (
    <div className="user-page">
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          className="my-page-frame"
        >
          {/* Left Panel - Settings */}
          <Stack flex={1.5} className="my-page-left">
            <Box>
              <Box className="menu-name">Modify Member Details</Box>
              <Box className="menu-content">
                <Settings />
              </Box>
            </Box>
          </Stack>

          {/* Right Panel - Profile */}
          <Stack flex={1} className="my-page-right">
            <Box className="order-info-box">
              {/* Avatar */}
              <Box className="order-user-img">
                <img
                  src={
                    authMember.userImage
                      ? `${serverApi}/${authMember.userImage}`
                      : "/icons/default-user.svg"
                  }
                  className="order-user-avatar"
                  alt="User Avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src={
                      authMember.userType === UserType.SHOP
                        ? "/img/spotifyShop.png"
                        : "/icons/user-badge.svg"
                    }
                    alt="Badge"
                  />
                </div>
              </Box>

              {/* Name / Type / Address */}
              <span className="order-user-name">
                {authMember.userNick || "No Name"}
              </span>
              <span className="order-user-prof">
                {authMember.userType || "Member"}
              </span>
              <span className="order-user-prof">
                {authMember.userAddress || "No Address"}
              </span>

              {/* Social Icons */}
              <Box className="user-media-box">
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>

              {/* Description */}
              <p className="user-desc">
                {authMember.userDesc || "No Description"}
              </p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
