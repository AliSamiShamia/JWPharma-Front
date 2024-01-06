const routeConfig = {
  onTokenExpiration: "refreshToken",
  storageTokenKeyName: "accessToken",
  collection: {
    list: "category",
  },
  product: {
    list: "product",
    listWihtoutFilter: "product/blank",
    // addToCart: "store",
  },
  cart: {
    list: "cart",
    store: "cart",
    clear: "clear-cart",
    total: "",
    quantity: "cart/update-quantity",
  },
  wishlist: {
    list: "wishlist",
    store: "wishlist",
    clear: "clear-wishlist",
    total: "",
  },
  order: {
    list: "order",
    track: "order/track",
    placeorder: "order",
  },
  banner: {
    list: "banner",
  },
  account: {
    login: "loginByEmail",
    register: "register",
    profile: "profile",
    refresh: "register",
    addresses: "user-address",
    otp: {
      send: "otp/send",
      check: "otp/check",
    },
  },
};
export default routeConfig;
