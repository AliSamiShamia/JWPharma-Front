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
  },
  order: {
    list: "order",
    track: "order/track",
    placeorder: "order/placeorder",
  },
  banner: {
    list: "banner",
  },
  account: {
    login: "loginByEmail",
    register: "register",
    profile: "profile",
    refresh: "register",
    addresses:"user/addresses",
    otp: {
      send: "otp/send",
      check: "otp/check",
    },
  },
};
export default routeConfig;
