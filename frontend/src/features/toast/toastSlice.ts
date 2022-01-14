import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    severity: "" as AlertColor,
    show: false,
    msg: "",
    duration: 3000 as number | null,
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
      // duration can be any number, null (for no autohide) or default
      let duration = action.payload.duration || 3000;
      if (action.payload.duration === null) {
        duration = null;
      }

      state.value = {
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
