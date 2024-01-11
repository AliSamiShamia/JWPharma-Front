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
  params: FilterItem[];
  is_fav?: boolean;
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
};
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
  first_name: string;
  middle_name?: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  country?: string;
  token: string;
  isAuth: boolean;
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
  handleAction: (
    page: number,
    filterData: any,
    action: (status: boolean) => void
  ) => void;
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
type OptionItem = {
  id: number;
  value_id: number;
};

type FilterValueProps = {
  type_id: number;
  value: string;
  id: number;
};

type CountryCodePropType = {
  handleChange: (option: any) => void;
  code: string;
};

type UserAddressType = {
  id: string;
  country: string;
  country_code: string;
  city: string;
  building: string;
  flat_number: string;
  map_url: string;
  address: string;
  type: string;
  is_default: boolean;
};

type OrderType = {
  id: number;
  tracking_number: string;
  status: string;
  user: string;
  user_address: OrderAddress;
  items: OrderItemType[];
  total_amount: string;
  quantity: number;
  created_at: string;
};
type OrderAddress = {
  id: number;
  country: string;
  country_code: string;
  address: string;
  city: string;
  building: string;
  flat_number: string;
  map_url: string;
  type: string;
  is_default: string;
};
type OrderItemType = {
  id: number;
  product: ProductType;
  quantity: number;
  price: number;
};
