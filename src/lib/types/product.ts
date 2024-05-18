import {
  ProductCollection,
  ProductStatus,
  ProductSize,
  ProductType,
  ProductChildSize,
  ProductShoesSize,
} from "../enums/product.enum";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productShoesSize: ProductShoesSize;
  productChildSize: ProductChildSize;
  productType: string;
  productDesc?: string;
  productImages: string[];
  productViews: number;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  search?: string;
}

