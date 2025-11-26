import { Box, Container, Stack } from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { UserType } from "../../../lib/enums/user.enum";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Settings } from "../userPage/Settings";

export default function UsersPage() {
  const navigate = useNavigate();
  const { authMember } = useGlobals();

  useEffect(() => {
    if (!authMember) {
      navigate("/", { replace: true });
    }
  }, [authMember, navigate]);

  if (!authMember) return null; // Wait until redirect

  return (
    <div className="user-page">
      <Container>
        <Stack
          className="my-page-frame"
          direction={{ xs: "column", md: "row" }}
          spacing={3}
        >
          <Stack className="my-page-left" flex={1}>
            <Box display="flex" flexDirection="column">
              <Box className="menu-name">Modify Member Details</Box>
              <Box className="menu-content">
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className="my-page-right" flex={2}>
            <Box
              className="order-info-box"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <div className="order-user-img">
                <img
                  src={
                    authMember?.userImage
                      ? `${serverApi}/${authMember.userImage}`
                      : "/icons/default-user.svg"
                  }
                  className="order-user-avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src={
                      authMember?.userType === UserType.SHOP
                        ? "/img/soprtifyShop.png"
                        : "/icons/user-badge.svg"
                    }
                    alt="user type"
                  />
                </div>
              </div>
              <span className="order-user-name">{authMember?.userNick}</span>
              <span className="order-user-prof">{authMember?.userType}</span>
              <span className="order-user-prof">
                {authMember?.userAddress || "Do not exist"}
              </span>
              <Box className="user-media-box">{/* Social icons */}</Box>
              <p className="user-desc">
                {authMember?.userDesc || "No Description"}
              </p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
