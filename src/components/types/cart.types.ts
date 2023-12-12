import { ProductType } from "./product.types";

export type CartType = {
  id: number;
  product: ProductType;
  quantity: number;
};
