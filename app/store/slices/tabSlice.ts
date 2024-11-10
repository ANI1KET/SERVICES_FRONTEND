import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  activeTabs: { [key: string]: string };
}

const initialState: TabState = {
  activeTabs: {
    SearchTab: "room",
  },
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActiveTab(
      state,
      action: PayloadAction<{ componentId: string; activeTab: string }>
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

export const { setActiveTab, RemoveActiveTab } = tabSlice.actions;

export default tabSlice.reducer;
