import React, { useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
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
    if (!authMember) {
      navigate("/", { replace: true });
    }
  }, [authMember, navigate]);

  // Show nothing while redirecting or loading authMember
  if (!authMember) return null;

  return (
    <div className="user-page">
      <Container>
        <Stack
          className="my-page-frame"
          direction={{ xs: "column", md: "row" }}
          spacing={3}
        >
          {/* Left Panel */}
          <Stack className="my-page-left" flex={1}>
            <Box>
              <Box className="menu-name">Modify Member Details</Box>
              <Box className="menu-content">
                <Settings />
              </Box>
            </Box>
          </Stack>

          {/* Right Panel */}
          <Stack className="my-page-right" flex={1}>
            <Box className="order-info-box">
              <Box display="flex" flexDirection="column" alignItems="center">
                <div className="order-user-img">
                  <img
                    src={
                      authMember.userImage
                        ? `${serverApi}/${authMember.userImage}`
                        : "/icons/default-user.svg"
                    }
                    className="order-user-avatar"
                    alt="User"
                  />
                  <div className="order-user-icon-box">
                    <img
                      src={
                        authMember.userType === UserType.SHOP
                          ? "/img/soprtifyShop.png"
                          : "/icons/user-badge.svg"
                      }
                      alt="Badge"
                    />
                  </div>
                </div>
                <span className="order-user-name">{authMember.userNick || "No Name"}</span>
                <span className="order-user-prof">{authMember.userType || "Member"}</span>
                <span className="order-user-prof">
                  {authMember.userAddress || "No Address"}
                </span>
              </Box>

              <Box className="user-media-box" display="flex" gap={1} mt={1} mb={1}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>

              <p className="user-desc">{authMember.userDesc || "No Description"}</p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
