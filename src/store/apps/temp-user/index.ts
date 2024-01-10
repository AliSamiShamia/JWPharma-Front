import { createSlice } from "@reduxjs/toolkit";

type TempUserType = {
  user_name: string;
  user_id: string;
};
const initialState = {
  temp_info: {} as TempUserType,
};

export const userTempSlice = createSlice({
  name: "temp_user",
  initialState,
  reducers: {
    storeTempUser: (state, action) => {
      state.temp_info = action.payload;
    },

    deleteTempUser: (state) => {
      state.temp_info = {} as TempUserType;
    },
  },
});

export const { storeTempUser, deleteTempUser } = userTempSlice.actions;
