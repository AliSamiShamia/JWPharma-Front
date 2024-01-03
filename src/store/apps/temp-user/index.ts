import { createSlice } from "@reduxjs/toolkit";

type TempUserType = {
  phone_number: string;
  country_code: string;
  blank_phone: string;
};
const initialState = {
  info: {} as TempUserType,
};

export const userTempSlice = createSlice({
  name: "temp_user",
  initialState,
  reducers: {
    storeTempUser: (state, action) => {
      state.info = action.payload;
    },

    deleteTempUser: (state) => {
      state.info = {} as TempUserType;
    },
  },
});

export const { storeTempUser, deleteTempUser } = userTempSlice.actions;
