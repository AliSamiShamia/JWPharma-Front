type PaginationPropType = {
  perPage: number;
  loadMore?: boolean;
  showAll?: boolean;
};

type ProductType = {
  id: number;
  slug: string;
  sku: string;
  name: string;
  price: number;
  pre_price: number;
  weight: number;
  stock: number;
  brief: string;
  is_trending: boolean;
  is_featured: boolean;
  discount: DiscountType;
  media: MediaType[];
  thumbnail: MediaType;
};

type MediaType = {
  id: number;
  url: string;
};

type DiscountType = {
  id: number;
  name: string;
  description: string;
  discount_percent: string;
};

type CollectionType = {
  id: number;
  slug: string;
  name: string;
  parent: string;
  products: string;
  url: string;
};
