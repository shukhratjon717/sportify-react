import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Icon, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import {
  ProductCollection,
  ProductGender,
  ProductType,
} from "../../../lib/enums/product.enum";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { setBrandProducts, setProducts } from "./slice";
import { retrieveBrandProducts, retrieveProducts } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

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
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error on ProductsPage:", err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /**Handlers */

  const searchTypeHandler = (collection: ProductType) => {
    productSearch.page = 1;
    productSearch.productType = collection;
    setProductSearch({ ...productSearch });
  };

  const searchGenderHandler = (gender: ProductGender) => {
    productSearch.page = 1;
    productSearch.productGender = gender;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseTypeHandler = (id: string) => {
    history.push(`/products/${id}`);
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
                  // onKeyDown={}
                />
                <Stack className={"search-btn"}>
                  <Button
                    className={"search-txt"}
                    variant="contained"
                    onClick={searchProductHandler}
                    // endIcon={<SearchIcon />}
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

            <Stack className={"dishes-filter-box2"}>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.productGender === ProductGender.MAN
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchGenderHandler(ProductGender.MAN)}
              >
                Man
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.productGender === ProductGender.WOMAN
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchGenderHandler(ProductGender.WOMAN)}
              >
                Woman
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.productGender === ProductGender.CHIDREN
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchGenderHandler(ProductGender.CHIDREN)}
              >
                Children
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
              {products.length !== 0 ? (
                products.map((product: Product) => {
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
                            <Button
                              className={"view-btn"}
                              sx={{ right: " 36px" }}
                            >
                              <Badge
                                badgeContent={product.productViews}
                                color="primary"
                              >
                                <RemoveRedEyeIcon
                                  sx={{
                                    color:
                                      product.productViews === 0
                                        ? "gray"
                                        : "white",
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
                          {product.productPrice}
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
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
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
            {/* <Stack className="brands-title">Our Family Brands </Stack> */}
            <Stack className="brand-img">
              <Stack>
                <div className={"brands-title"}>
                  Check out our latest trends
                </div>
                {"\n"}
                <div className={"brand-paragraph"}>
                  Explore the latest fashion trends and styles with our diverse
                  collection. From casual to formal wear, we have something for
                  every occasion. Our products are made from premium quality
                  materials and are designed to keep you stylish and comfortable
                  all day long. Start shopping now!
                </div>
              </Stack>
              {products.length === 0 ? (
                products.map((product, index) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack key={index} className={"brand-card"}>
                      <Stack
                        className={"brands-img"}
                        sx={{
                          backgroundImage: `url(${imagePath})`,
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
                            {product.productPrice}
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
