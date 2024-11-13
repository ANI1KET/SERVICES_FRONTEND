import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./apiSlice";
import tabSlice from "./slices/tabSlice";
import userSlice from "./slices/userSlice";

export const store = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      tabs: tabSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
