import { UserType } from "@/components/types/user.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {} as UserType,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.info = action.payload;
    },
    updateUser: (state, action) => {
      state.info = action.payload;
    },
    deleteUser: (state) => {
      state.info = {} as UserType;
    },
  },
});

export const { storeUser, updateUser, deleteUser } = userSlice.actions;
