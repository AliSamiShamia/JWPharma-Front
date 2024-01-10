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
    view: "order/view",
    track: "order/track",
    placeorder: "order",
    invoice: "order/invoice",
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
    defaultAddress: "default-address",
    otp: {
      send: "otp/send",
      check: "otp/check",
    },
    update: {
      info: "update-info",
      security: "update-info/security",
    },
  },
};
export default routeConfig;
