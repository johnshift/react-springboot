import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    severity: "" as AlertColor,
    show: false,
    msg: "",
    duration: 3000,
  },
};

export const userSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastClose: (state) => {
      state.value = { ...state.value, show: false };
    },
    newToast: (state, action) => {
      state.value = {
        severity: action.payload.severity,
        show: true,
        msg: action.payload.msg,
        duration: action.payload.duration || 3000,
      };
    },
  },
});

export const { newToast, toastClose } = userSlice.actions;

export const toastReducer = userSlice.reducer;
