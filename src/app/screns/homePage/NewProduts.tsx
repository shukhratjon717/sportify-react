import React from "react";
import { Box, Container, Stack } from "@mui/material"; //
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card"; //
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography"; //
import { CssVarsProvider } from "@mui/joy/styles"; //
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

const newProducts = [
  {
    desc: "Browse through our selection. Find your style and add items to your cart.",
    step: "Step1: ",
    imagePath: "/img/jacket3.png",
  },
  {
    desc: "Select your favorite pieces. You're one step closer to the perfect fashion fusion.",
    step: "Step2: ",
    imagePath: "/img/jacket2.jpg",
  },
  {
    desc: "Complete your purchase. Sit back and relax as we prepare your order!",
    step: "Step3: ",
    imagePath: "/img/womanJ2.jpeg",
  },
];

export default function NewDishes() {
  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Explore Our Collections</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newProducts.length !== 0 ? (
                newProducts.map((ele, index) => {
                  return (
                    <Card key={index} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={ele.imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className={"title"}>
                              {ele.step}
                              {ele.desc}
                            </Typography>
                          </Stack>
                          <Stack></Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not availle!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
