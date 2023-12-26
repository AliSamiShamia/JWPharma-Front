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
  parent?: string;
  products: ProductType[];
  url: string;
  filter: Array<FilterType>;
};

type FilterType = {
  title: string;
  values: object | Array<any>;
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
