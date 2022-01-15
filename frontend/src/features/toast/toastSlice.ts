import { AlertProps } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToastSlice = {
  value: {
    severity: AlertProps["severity"] | undefined;
    show: boolean;
    msg: string;
    duration: number | null;
    params: {
      defaultDelay: number;
      longDelay: number;
      stmhErrDelay: number;
    };
  };
};

const initialState = {
  value: {
    severity: undefined as AlertProps["severity"],
    show: false,
    msg: "",
    duration: null as null | number,
    params: {
      defaultDelay: 3000,
      longDelay: 5000,
      stmhErrDelay: 10000,
    },
  },
};

export interface NewToastAction {
  severity: AlertProps["severity"] | undefined;
  msg: string;
  duration?: number | null;
}

export const userSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastClose: (state) => {
      state.value = { ...state.value, show: false };
    },
    newToast: (state, action: PayloadAction<NewToastAction>) => {
      // duration can be any number, null (for no autohide) or default
      let duration =
        action.payload.duration || state.value.params.defaultDelay || null;
      if (action.payload.duration === null) {
        duration = null;
      }

      state.value = {
        ...state.value,
        severity: action.payload.severity,
        show: true,
        msg: action.payload.msg,
        duration,
      };
    },
  },
});

export const { newToast, toastClose } = userSlice.actions;

export const toastReducer = userSlice.reducer;

export const selectToast = (state: ToastSlice) => state.value;
