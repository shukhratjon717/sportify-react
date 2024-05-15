import React from "react";
import { Box, Container, Stack } from "@mui/material"; //
import Card from "@mui/joy/Card"; //
import CardCover from "@mui/joy/CardCover"; //
import CardContent from "@mui/joy/CardContent"; //
import Typography from "@mui/joy/Typography"; //
import { CssVarsProvider } from "@mui/joy/styles"; //
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/OutboundOutlined";

const list = [
  { productName: "Jacket", imagePath: "/img/jacket3.png" },
  { productName: "Woman Jacket", imagePath: "/img/jacket2.jpg" },
  { productName: "New balance", imagePath: "/img/womanJ2.jpeg" },
  { productName: "Nike", imagePath: "/img/womanJacket.webp" },
];

export default function PopularDishes() {
  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title"> Popular Products</Box>
          <Stack className="cards-frame">
            {list.map((ele, index) => {
              return (
                <CssVarsProvider key={index}>
                  <Card className={"card"}>
                    <CardCover>
                      <img src={ele.imagePath} alt="" />
                    </CardCover>
                    <CardCover className="card-cover" />
                    <CardContent sx={{ justifyContent: "flex-end" }}>
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          level="h2"
                          fontSize="lg"
                          textColor="#fff"
                          mb={1}
                        >
                          {ele.productName}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "md",
                            color: "neutral.300",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          20
                          <VisibilityIcon
                            sx={{ fontSize: 25, marginLeft: "5px" }}
                          />
                        </Typography>
                      </Stack>
                    </CardContent>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                        height: "60px",
                      }}
                    >
                      <Typography
                        startDecorator={<DescriptionOutlinedIcon />}
                        textColor="neutral.300"
                      >
                        This is very comfortable
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
