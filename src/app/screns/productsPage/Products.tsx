import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Badge,
  Pagination,
  PaginationItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductType } from "../../../lib/enums/product.enum";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products: Array.isArray(products) ? products : [],
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
  const history = useHistory();

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts(productSearch)
      .then((response) => {
        if (typeof response === 'string') {
          // Check if the response is a string and possibly HTML content
          console.error("Fetched data is not JSON:", response);
          return;
        }
        if (Array.isArray(response)) {
          setProducts(response);
        } else {
          console.error("Fetched data is not an array:", response);
        }
      })
      .catch((err) => {
        console.error("Error on ProductsPage:", err);
      });
  }, [productSearch, setProducts]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prevSearch) => ({ ...prevSearch, search: "" }));
    }
  }, [searchText]);

  /**Handlers */
  const searchTypeHandler = (collection: ProductType) => {
    setProductSearch((prevSearch) => ({
      ...prevSearch,
      page: 1,
      productType: collection,
    }));
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch((prevSearch) => ({
      ...prevSearch,
      page: 1,
      order,
    }));
  };

  const searchProductHandler = () => {
    setProductSearch((prevSearch) => ({
      ...prevSearch,
      search: searchText,
    }));
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    setProductSearch((prevSearch) => ({
      ...prevSearch,
      page: value,
    }));
  };

  const chooseTypeHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const renderProductCards = (products: Product[]) => {
    if (products.length === 0) {
      return <Box className="no-data">Products are not available!</Box>;
    }

    return products.map((product) => {
      const imagePath = `${serverApi}/${product.productImages[0]}`;
      return (
        <Stack key={product._id} className={"product-card"}>
          <Stack
            className={"product-img"}
            sx={{
              backgroundImage: `url(${imagePath})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <Stack className={"hoverable"}>
              <Button
                className={"shop1-btn"}
                onClick={(e) => {
                  console.log("BUTTON PRESSED!");
                  onAdd({
                    _id: product._id,
                    quantity: 1,
                    name: product.productName,
                    price: product.productPrice,
                    image: product.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                <img
                  src={"/icons/shopping-cart.svg"}
                  style={{ display: "flex" }}
                />
              </Button>
              <Stack>
                <Button className={"view-btn"} sx={{ right: "36px" }}>
                  <Badge badgeContent={product.productViews} color="primary">
                    <RemoveRedEyeIcon
                      sx={{
                        color: product.productViews === 0 ? "gray" : "white",
                      }}
                    />
                  </Badge>
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Box className={"product-desc"}>
            <span className={"product-title"}>{product.productName}</span>
            <div className={"product1-desc"}>
              <MonetizationOnIcon />
              {product.productPrice}
            </div>
          </Box>
        </Stack>
      );
    });
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          className={"products-frame"}
        >
          <Stack className={"upper-frame"}>
            <Box className={"title"}> Sportify Products</Box>
            <Box className={"search-bar"}>
              <Stack className={"ractangle"}>
                <input
                  type="search"
                  className={"input"}
                  placeholder="type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Stack className={"search-btn"}>
                  <Button
                    className={"search-txt"}
                    variant="contained"
                    onClick={searchProductHandler}
                  >
                    Search
                  </Button>
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
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productType === ProductType.JACKETS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchTypeHandler(ProductType.JACKETS)}
                >
                  Jackets
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productType === ProductType.COATS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchTypeHandler(ProductType.COATS)}
                >
                  Coats
                </Button>
                <Button
                  className="t-shirt"
                  variant={"contained"}
                  color={
                    productSearch.productType === ProductType.T_SHIRTS
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchTypeHandler(ProductType.T_SHIRTS)}
                >
                  T-shirts
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productType === ProductType.SHOES
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchTypeHandler(ProductType.SHOES)}
                >
                  Shoes
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productType === ProductType.SET
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchTypeHandler(ProductType.SET)}
                >
                  Set
                </Button>
              </div>
            </Stack>
            <Stack className={"product-wrapper"}>
              {renderProductCards(products)}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={Math.ceil((products.length || 1) / productSearch.limit)}
              page={productSearch.page}
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
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands">
        <Container>
          <Stack className="brands-container">
            <Stack className="brand-img">
              <Stack>
                <div className={"brands-title"}>
                  Check out our latest trends
                </div>
                <div className={"brand-paragraph"}>
                  Explore the latest fashion trends and styles with our diverse
                  collection. From casual to formal wear, we have something for
                  every occasion. Our products are made from premium quality
                  materials and are designed to keep you stylish and comfortable
                  all day long. Start shopping now!
                </div>
              </Stack>
              {renderProductCards(products)}
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className="address">
        <Container>
          <Stack className={"address-container"}></Stack>
        </Container>
      </div>
    </div>
  );
}
