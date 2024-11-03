import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  activeTabs: { [key: string]: string };
  cursorPosition: {
    [key: string]: { left: number; width: number; opacity: number };
  };
}

const initialState: TabState = {
  activeTabs: {},
  // cursorPosition: {
  //   SearchTab: {
  //     left: 0,
  //     width: 0,
  //     opacity: 1,
  //   },
  //   HeaderTab: {
  //     left: 0,
  //     width: 0,
  //     opacity: 1,
  //   },
  //   BottomTab: {
  //     left: 0,
  //     width: 0,
  //     opacity: 1,
  //   },
  // },
  cursorPosition: {},
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
    setCursorPosition(
      state,
      action: PayloadAction<{
        [key: string]: { left: number; width: number; opacity: number };
      }>
    ) {
      state.cursorPosition = { ...state.cursorPosition, ...action.payload };
    },
    RemoveActiveTab: (state, action: PayloadAction<string>) => {
      const componentId = action.payload;
      delete state.activeTabs[componentId];
      delete state.cursorPosition[componentId];
    },
  },
});

export const { setActiveTab, setCursorPosition, RemoveActiveTab } =
  tabSlice.actions;

export default tabSlice.reducer;
