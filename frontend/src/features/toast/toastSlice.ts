import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { TOAST_MSG_LOADING } from "./constants";

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
      console.log("toastClose called");
      state.value = { ...state.value, show: false };
    },
    newToast: (state, action) => {
      state.value = {
        severity: action.payload.severity,
        show: true,
        msg: action.payload.msg,
      };
    },
  },
});

export const { newToast, toastClose } = userSlice.actions;

export const toastReducer = userSlice.reducer;
