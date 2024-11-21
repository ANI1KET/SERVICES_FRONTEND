import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  city: string;
}

const initialState: CounterState = {
  city: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defaultCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { defaultCity } = userSlice.actions;

export default userSlice.reducer;
