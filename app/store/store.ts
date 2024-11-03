import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import tabSlice from "./slices/tabSlice";

export const store = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      tabs: tabSlice,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
