import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #f2d2cd;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
      <Stack className={"footer-title"}> Let's enjoy from shopping</Stack>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            {/* <Box>
              <img width={"100px"} src={"/icons/burak.svg"} />
            </Box> */}
            <Box className={"foot-desc-txt"}>
              Sportify is your go-to online store for all things brand clothes.
              From top to buttom, find top-quality products for every activity.
              With easy browsing, secure payments, and fast shipping, we've got
              your body needs covered.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Tranding</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Men's</Link>
                  <Link to="/products">Style</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Fashiom</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Woman's Fashion</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <div>Collabrate with</div>
                  </Box>
                  <Box className={"find-us"}>
                    <div>Designers welcome </div>
                  </Box>
                  <Box className={"find-us"}>
                    <div>Join our team</div>
                  </Box>
                  
                </Box>
              </Box>
            </Stack>

            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Fashion tips</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <div>Gift ideas</div>
                  </Box>
                  <Box className={"find-us"}>
                    <div>New arrivals</div>
                  </Box>
                  <Box className={"find-us"}>
                    <div>Exclusive deals</div>
                  </Box>
                 
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Revolution & Evolution, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
