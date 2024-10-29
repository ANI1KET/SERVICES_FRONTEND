import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// Async thunk to fetch data
export const fetchData = createAsyncThunk("user/fetchData", async () => {
  // const response = await axios.get("https://api.example.com/data");
  // return response.data;
  return 23;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
