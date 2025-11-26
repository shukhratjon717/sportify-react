import React, { useEffect } from "react";
import { Container, Stack, Box, Button, Rating } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useParams } from "react-router-dom";

import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import Divider from "../../components/divider";
import { setChosenProduct, setShop } from "./slice";
import { retrieveChosenProduct, retrieveShop } from "./selector";
import { Product } from "../../../lib/types/product";
import { User } from "../../../lib/types/user";
import { CartItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";

/** Redux action dispatcher */
const actionDispatch = (dispatch: any) => ({
  setShop: (data: User) => dispatch(setShop(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

/** Redux selectors */
const chosenProductSelector = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);

const shopSelector = createSelector(retrieveShop, (shop) => ({ shop }));

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct({ onAdd }: ChosenProductProps) {
  const { productId } = useParams<{ productId: string }>();
  const { setShop, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductSelector);
  const { shop } = useSelector(shopSelector);

  useEffect(() => {
    if (!productId) return;

    const productService = new ProductService();
    const memberService = new MemberService();

    productService
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.error("Error fetching product:", err));

    memberService
      .getShop()
      .then((data) => setShop(data))
      .catch((err) => console.error("Error fetching shop:", err));
  }, [productId, setChosenProduct, setShop]);

  if (!chosenProduct) return <div>Loading product...</div>;

  return (
    <div className="chosen-product">
      <Box className="title">Product Detail</Box>
      <Container className="product-container">
        <Stack className="chosen-product-slider">
          <Swiper
            loop
            spaceBetween={10}
            navigation
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct.productImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img className="slider-image" src={`${serverApi}/${img}`} alt={`Product ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>

        <Stack className="chosen-product-info">
          <Box className="info-box">
            <strong className="product-name">{chosenProduct.productName}</strong>
            {shop && (
              <>
                <span className="resto-name">{shop.userNick}</span>
                <span className="resto-name">{shop.userPhone}</span>
              </>
            )}
            <Box className="rating-box">
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className="evaluation-box">
                <div className="product-view">
                  <RemoveRedEyeIcon sx={{ mr: 1 }} />
                  <span>{chosenProduct.productViews}</span>
                </div>
              </div>
            </Box>

            <p className="product-desc">{chosenProduct.productDesc || "No description"}</p>
            <Divider height="1" width="100%" bg="#000" />

            <div className="product-price">
              <span>Price:</span>
              <span>${chosenProduct.productPrice}</span>
            </div>

            <div className="button-box">
              <Button
                variant="contained"
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
