import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";
import { ToastErrorAction, ToastSlice, ToastSuccessAction } from "./types";

export const initialState: ToastSlice = {
  show: false,
  msg: undefined,
  severity: "error",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastClose: (state) => ({
      ...state,
      show: false,
      msg: undefined,
    }),
    toastSuccess: (state, action: PayloadAction<ToastSuccessAction>) => ({
      ...state,
      msg: action.payload.msg,
      severity: "success",
      show: true,
    }),
    toastError: (state, action: PayloadAction<ToastErrorAction>) => ({
      ...state,
      msg: action.payload.msg,
      severity: "error",
      show: true,
    }),
    toastLoading: (state) => ({
      ...state,
      msg: TOAST_MSG_LOADING,
      severity: "warning",
      show: true,
    }),
    toastLonger: (state) => ({
      ...state,
      msg: TOAST_MSG_LONGER,
      severity: "warning",
      show: true,
    }),
    toastTimeout: (state) => ({
      ...state,
      msg: MSG_SOMETHING_WENT_WRONG,
      severity: "error",
      show: true,
    }),
  },
});

export const {
  toastClose,
  toastSuccess,
  toastError,
  toastLoading,
  toastLonger,
  toastTimeout,
} = toastSlice.actions;
