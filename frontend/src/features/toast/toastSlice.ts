import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    severity: "" as AlertColor,
    show: false,
    msg: "",
  },
};

export const userSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastClose: (state) => {
      state.value = { ...state.value, show: false };
    },
    toastError: (state, action) => {
      state.value = {
        severity: "error",
        show: true,
        msg: action.payload,
      };
    },
    toastLoading: (state) => {
      state.value = {
        severity: "warning",
        show: true,
        msg: "Loading please wait",
      };
    },
    toastInfo: (state, action) => {
      state.value = {
        severity: "info",
        show: true,
        msg: action.payload,
      };
    },
    toastSuccess: (state, action) => {
      state.value = {
        severity: "success",
        show: true,
        msg: action.payload,
      };
    },
  },
});

export const { toastSuccess, toastInfo, toastError, toastLoading, toastClose } =
  userSlice.actions;

export const toastReducer = userSlice.reducer;
