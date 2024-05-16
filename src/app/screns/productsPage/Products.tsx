import React from "react";
import { Box, Button, Container, Icon, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Jacket", imagePath: "/img/jacket3.png" },
  { productName: "man Jacket", imagePath: "/img/jacket2.jpg" },
  { productName: "New balance", imagePath: "/img/womanJ2.jpeg" },
  { productName: "Nike", imagePath: "/img/womanJacket.webp" },
  { productName: "Jacket", imagePath: "/img/jacket3.png" },
  { productName: "man Jacket", imagePath: "/img/jacket2.jpg" },
  { productName: "New balance", imagePath: "/img/womanJ2.jpeg" },
  { productName: "Nike", imagePath: "/img/womanJacket.webp" },
];

const brandProducts = [
  { productName: "man Jacket", imagePath: "/img/jacket2.jpg" },
  { productName: "man Jacket", imagePath: "/img/jacket2.jpg" },
];
export default function Products() {
  return (
    <div className={"products"}>
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          //   className={"products-frame"}
        >
          <Stack className={"upper-frame"}>
            <Box className={"title"}> Sportify Products</Box>
            <Box className={"search-bar"}>
              <Stack className={"ractangle"}>
                <input className={"input"} placeholder="type here"></input>
                <Stack className={"search-btn"}>
                  <Box className={"search-txt"}>Search</Box>
                  <Box className={"search-icon"}>
                    <SearchIcon className="search-btn-icon" />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Stack className={"dishes-filter-section"}>
            <div className="product-filter">Filter</div>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button variant={"contained"} color={"secondary"}>
                  Jackets
                </Button>
                <Button variant={"contained"} color={"secondary"}>
                  Coats
                </Button>
                <Button className="t-shirt" variant={"contained"} color={"secondary"}>
                  T-shirts
                </Button>
                <Button variant={"contained"} color={"secondary"}>
                  Shoes
                </Button>
                <Button variant={"contained"} color={"primary"}>
                  Set
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => {
                  return (
                    <Stack key={index} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${product.imagePath})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className={"product-sale"}>Normal size</div>

                        <Stack className={"hoverable"}>
                          <Button className={"shop1-btn"}>
                            <img
                              src={"/icons/shopping-cart.svg"}
                              style={{ display: "flex" }}
                            />
                          </Button>
                          <Stack>
                            <Button
                              className={"view-btn"}
                              sx={{ right: " 36px" }}
                            >
                              <Badge badgeContent={20} color="secondary">
                                <RemoveRedEyeIcon
                                  sx={{
                                    color: 20 ? "gray" : "white",
                                  }}
                                />
                              </Badge>
                            </Button>
                          </Stack>
                        </Stack>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product1-desc"}>
                          <MonetizationOnIcon />
                          {12}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data"> Products are not availabe!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands">
        <Container>
          <Stack className="brands-container">
            {/* <Stack className="brands-title">Our Family Brands </Stack> */}
            <Stack className="brand-img">
              <Stack>
                <div className={"brands-title"}>
                  Check out our latest trends
                </div>
                m{"\n"}
                <div className={"brand-paragraph"}>
                  Explore the latest fashion trends and styles with our diverse
                  collection. From casual to formal wear, we have something for
                  every occasion. Our products are made from premium quality
                  materials and are designed to keep you stylish and comfortable
                  all day long. Start shopping now!
                </div>
              </Stack>
              {brandProducts.length !== 0 ? (
                brandProducts.map((product, index) => {
                  return (
                    <Stack key={index} className={"brand-card"}>
                      <Stack
                        className={"brands-img"}
                        sx={{
                          backgroundImage: `url(${product.imagePath})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      ></Stack>
                      <Box className={"brand-desc"}>
                        <span className={"brand-title"}>
                          {product.productName}
                        </span>
                        <div className={"brand-money-holder"}>
                          <div className={"brand-money"}>
                            <MonetizationOnIcon />
                            {12}
                          </div>
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data"> Products are not availabe!</Box>
              )}
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className="address">
        <Container>
          <Stack className={"address-container"}>
            <Box className={"address-title"}>Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.865228898446!2d126.9945731!3d37.5346741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca24c2f390b6f%3A0x395baa4b310e0016!2sKing%20Kebab%20Itaewon%20(Halal)!5e0!3m2!1sen!2skr!4v1712129201544!5m2!1sen!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
