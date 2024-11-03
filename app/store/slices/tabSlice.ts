import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  activeTabs: Record<string, string | null>;
}

const initialState: TabState = {
  activeTabs: {},
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActiveTab(
      state,
      action: PayloadAction<{ componentId: string; activeTab: string | null }>
    ) {
      const { componentId, activeTab } = action.payload;
      state.activeTabs[componentId] = activeTab;
    },
    RemoveActiveTab: (state, action: PayloadAction<string>) => {
      const componentId = action.payload;
      delete state.activeTabs[componentId];
    },
  },
});

export const { setActiveTab } = tabSlice.actions;

export default tabSlice.reducer;
