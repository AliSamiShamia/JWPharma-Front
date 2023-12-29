import { ImageType } from "./image.types";

export type ProductType = {
  id: number;
  slug: string;
  name: string;
  sku: string;
  description: string;
  brief: string;
  price: number;
  pre_price: number;
  weight: number;
  is_trending: boolean;
  is_featured: boolean;
  stock: number;
  discount: Array<Object>;
  images: Array<ImageType>;
  thumbnail: {
    id: number;
    url: string;
  };
};
