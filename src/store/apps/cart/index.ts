import { CartType } from "@/components/types/cart.types";
import { post } from "@/handler/api.handler";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [] as CartType[],
};

const updateCart = async (item: CartType) => {
  // let res = await post();
  console.log(item);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
        updateCart(item);
      } else {
        state.items.push(action.payload);
        updateCart(action.payload);
      }
    },

    deleteFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    resetCart: (state) => {
      state.items = [];
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decrementQantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  resetCart,
  incrementQuantity,
  decrementQantity,
} = cartSlice.actions;
