import routeConfig from "@/components/constant/route";
import { CartType } from "@/components/types/cart.types";
import { destroy, post } from "@/handler/api.handler";
import { useAppSelector } from "@/store/hooks";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [] as CartType[],
};



export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const item = state.items.find(
        (item) => item.product.id == action.payload.product.id
      );

      if (item) {
        // let init = async () => {
        //   await updateCart(item);
        // };
        // init();
        item.quantity += action.payload.quantity;
      } else {
        // let init = async () => {
        //   await updateCart(action.payload);
        // };
        // init();
        state.items.push(action.payload);
        // updateCart(action.payload);
      }
    },

    deleteFromCart: (state, action) => {
     // removeItemFromCart(action.payload.product.id);
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.product.id
      );
    },

    resetCart: (state) => {
      state.items = [];
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (item) {
        item.quantity++;
      }
    },

    decrementQantity: (state, action) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.product.id !== action.payload.product.id
          );
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
  initCart,
  incrementQuantity,
  decrementQantity,
} = cartSlice.actions;
