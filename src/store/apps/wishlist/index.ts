import { WishListType } from "@/components/types/wishlist.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [] as WishListType[],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    initWishlist: (state, action) => {
      state.products = action.payload;
    },
    addToWishlist: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      if (!item) {
        state.products.push(action.payload);
      }
    },

    deleteFromWishlist: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload.id);
    },

    resetWishlist: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToWishlist,
  deleteFromWishlist,
  initWishlist,
  resetWishlist,
} = wishlistSlice.actions;
