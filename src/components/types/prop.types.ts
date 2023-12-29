type PaginationPropType = {
  perPage: number;
  loadMore?: boolean;
  showAll?: boolean;
};
type ProductListType = {
  filter: Array<FilterItem>;
  products: ProductType[];
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
  categories: ProductCollectionType[];
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
type ProductCollectionType = {
  id: number;
  slug: string;
  name: string;
}
type CollectionType = {
  id: number;
  slug: string;
  name: string;
  parent?: string;
  products: ProductType[];
  url: string;
  filter: Array<FilterItem>;
  price_range: PriceRangeType;
};

type ErrCallbackType = (err: { [key: string]: string }) => void;

type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type RegisterParams = {
  email: string;
  username: string;
  password: string;
};

type UserDataType = {
  id: number;
  role: string;
  email: string;
  fullName: string;
  username: string;
  password: string;
  avatar?: string | null;
};

type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
};

type FilterProps = {
  filters: FilterItem[];
  params?: any;
  handleAction: (page: number, action: (status: boolean) => void) => void;
  setFilterParam: (params: any) => void;
};

type PriceRangeType = {
  min: number;
  max: number;
};
type FilterItem = {
  id: number;
  title: string;
  values: FilterValueProps[];
};

type FilterValueProps = {
  value: string;
  id: number;
};
