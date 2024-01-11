import { UserType } from "@/components/types/user.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {} as UserType,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.auth = action.payload;
    },

    updateUser: (state, action) => {
      state.auth = action.payload;
    },
    deleteUser: (state) => {
      state.auth = {} as UserType;
    },
  },
});

export const { storeUser, updateUser, deleteUser } = userSlice.actions;
