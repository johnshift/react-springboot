import { AlertProps } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewToastAction {
  severity: AlertProps["severity"] | undefined;
  msg: string;
  duration?: number | null;
}

export interface SetDelayParamsAction {
  dismissDelay?: number | null;
  longDelay: number | null;
  smthErrDelay: number | null;
}

export interface ToastDelayParams {
  dismissDelay: number | null;
  longDelay: number | null;
  smthErrDelay: number | null;
}

export interface ToastSlice {
  value: {
    severity: AlertProps["severity"] | undefined;
    show: boolean;
    msg: string;
    duration: number | null;
    delayParams: ToastDelayParams;
  };
}

export const initialState: ToastSlice = {
  value: {
    severity: undefined as AlertProps["severity"],
    show: false,
    msg: "",
    duration: null as null | number,
    delayParams: {
      dismissDelay: 3000,
      // loadingDelay: 3000,
      longDelay: 5000,
      smthErrDelay: 10000,
    },
  },
};

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
        action.payload.duration || state.value.delayParams.dismissDelay || null;
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
    setDelayParams: (state, action: PayloadAction<SetDelayParamsAction>) => {
      state.value = {
        ...state.value,
        delayParams: {
          dismissDelay:
            action.payload.dismissDelay ||
            initialState.value.delayParams.dismissDelay,
          longDelay:
            action.payload.longDelay ||
            initialState.value.delayParams.longDelay,
          smthErrDelay:
            action.payload.smthErrDelay ||
            initialState.value.delayParams.smthErrDelay,
        },
      };
    },
  },
});

export const { newToast, toastClose, setDelayParams } = userSlice.actions;

export const toastReducer = userSlice.reducer;

export const selectToast = (state: ToastSlice) => state.value;
