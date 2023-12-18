const routeConfig = {
  collection: {
    list: "category",
  },
  product: {
    list: "product",
  },
  cart: {
    list: "cart",
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
    login: "login",
    register: "register",
    profile: "profile",
    refresh: "register",
    otp: {
      send: "otp/send",
      check: "otp/check",
    },
  },
};
export default routeConfig;
