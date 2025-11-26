import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";

import ProductService from "../../services/ProductService";
import { ProductCollection, ProductGender, ProductType } from "../../../lib/enums/product.enum";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error on ProductsPage:", err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch({ ...productSearch, search: "" });
    }
  }, [searchText]);

  /** Handlers */
  const searchTypeHandler = (collection: ProductType) => {
    setProductSearch({ ...productSearch, page: 1, productType: collection });
  };

  const searchGenderHandler = (gender: ProductGender) => {
    setProductSearch({ ...productSearch, page: 1, productGender: gender });
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch({ ...productSearch, page: 1, order });
  };

  const searchProductHandler = () => {
    setProductSearch({ ...productSearch, search: searchText });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    setProductSearch({ ...productSearch, page: value });
  };

  const chooseTypeHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack direction="column" alignItems="center" className="products-frame">
          {/* Search & Filters */}
          <Stack className="upper-frame">
            <Box className="title">Sportify Products</Box>
            <Box className="search-bar">
              <Stack className="ractangle">
                <input
                  type="search"
                  className="input"
                  placeholder="type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Stack className="search-btn">
                  <Button
                    className="search-txt"
                    variant="contained"
                    onClick={searchProductHandler}
                  >
                    Search
                  </Button>
                  <Box className="search-icon">
                    <SearchIcon className="search-btn-icon" />
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>

          {/* Product Filter Buttons */}
          <Stack className="dishes-filter-section">
            <div className="product-filter">Filter</div>
            <Stack className="dishes-filter-box">
              <Button
                variant="contained"
                className="order"
                color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant="contained"
                className="order"
                color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant="contained"
                className="order"
                color={productSearch.order === "productViews" ? "primary" : "secondary"}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>

            <Stack className="dishes-filter-box2">
              {/* Gender filter buttons (optional) */}
              {/* Uncomment if needed */}
              {/* <Button
                variant="contained"
                color={productSearch.productGender === ProductGender.MAN ? "primary" : "secondary"}
                onClick={() => searchGenderHandler(ProductGender.MAN)}
              >
                Man
              </Button> */}
            </Stack>
          </Stack>

          {/* Product Categories */}
          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                {[
                  ProductType.JACKETS,
                  ProductType.COATS,
                  ProductType.T_SHIRTS,
                  ProductType.SHOES,
                  ProductType.SET,
                ].map((type) => (
                  <Button
                    key={type}
                    variant="contained"
                    color={productSearch.productType === type ? "primary" : "secondary"}
                    onClick={() => searchTypeHandler(type)}
                  >
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </Button>
                ))}
              </div>
            </Stack>

            {/* Product Cards */}
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack key={product._id} className="product-card">
                      <Stack
                        className="product-img"
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      >
                        <Stack className="hoverable">
                          <Button
                            className="shop1-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                            }}
                          >
                            <img src="/icons/shopping-cart.svg" style={{ display: "flex" }} />
                          </Button>
                          <Button className="view-btn" sx={{ right: "36px" }}>
                            <Badge badgeContent={product.productViews} color="primary">
                              <RemoveRedEyeIcon
                                sx={{ color: product.productViews === 0 ? "gray" : "white" }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">{product.productName}</span>
                        <div className="product1-desc">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          {/* Pagination */}
          <Stack className="pagination-section">
            <Pagination
              count={products.length !== 0 ? productSearch.page + 1 : productSearch.page}
              page={productSearch.page}
              onChange={paginationHandler}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  color="secondary"
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      {/* Brands Section */}
      <div className="brands">
        <Container>
          <Stack className="brands-container">
            <Stack className="brand-img">
              <Stack>
                <div className="brands-title">Check out our latest trends</div>
                <div className="brand-paragraph">
                  Explore the latest fashion trends and styles with our diverse
                  collection. From casual to formal wear, we have something for
                  every occasion. Our products are made from premium quality
                  materials and are designed to keep you stylish and comfortable
                  all day long. Start shopping now!
                </div>
              </Stack>
              {products.length !== 0 ? (
                products.map((product, index) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack key={index} className="brand-card">
                      <Stack
                        className="brands-img"
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                      <Box className="brand-desc">
                        <span className="brand-title">{product.productName}</span>
                        <div className="brand-money-holder">
                          <div className="brand-money">
                            <MonetizationOnIcon />
                            {product.productPrice}
                          </div>
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>
        </Container>
      </div>

      {/* Address Section */}
      <div className="address">
        <Container>
          <Stack className="address-container">
            <Box className="address-title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.865228898446!2d126.9945731!3d37.5346741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca24c2f390b6f%3A0x395baa4b310e0016!2sKing%20Kebab%20Itaewon%20(Halal)!5e0!3m2!1sen!2skr!4v1712129201544!5m2!1sen!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Stack>
        </Container>
      </div>
    </div>
  );
}
