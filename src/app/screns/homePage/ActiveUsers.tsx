import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

const activeUsers = [
  { memberNick: "Martin", memberImage: "/img/martin.webp" },
  { memberNick: "Justin", memberImage: "/img/justin.webp" },
  { memberNick: "Rose", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className={"active-section"}>
          <Box className={"active-category-title"}>Active Users </Box>
          <Stack className={"active-users-cards-frame"}>
            <CssVarsProvider>
              {activeUsers.length !== 0 ? (
                activeUsers.map((ele, index) => {
                  return (
                    <Card
                      key={index}
                      variant="outlined"
                      className={"active-card"}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={ele.memberImage} alt="" />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow variant="soft" className={"users-detail"}>
                        <Stack className={"info"}>
                          <Stack flexDirection={"row"}>
                            <Typography className={"users-title"}>
                              {ele.memberNick}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
