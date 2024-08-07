import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { retrieveNewProducts } from "./selector";

const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({
    newProducts,
  })
);

export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);

  console.log("newProducts:", newProducts);

  // Ensure newProducts is an array
  const productsArray = Array.isArray(newProducts) ? newProducts : [];

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Explore Our Collections</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {productsArray.length !== 0 ? (
                productsArray.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeType =
                    product.productCollection === ProductCollection.CHIDREN
                      ? product.productChildSize + "size"
                      : product.productSize + "size";
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className={"card"}
                    >
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className={"title"}>
                              {"Lastest Products"}
                            </Typography>
                          </Stack>
                          <Stack></Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
