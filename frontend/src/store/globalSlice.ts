import { createSlice } from "@reduxjs/toolkit";

export const initialState: GlobalSlice = {
  showLoginModal: false,
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    closeLoginModal: (state) => ({ ...state, showLoginModal: false }),
    openLoginModal: (state) => ({ ...state, showLoginModal: true }),
  },
});

export const { closeLoginModal, openLoginModal } = globalSlice.actions;
