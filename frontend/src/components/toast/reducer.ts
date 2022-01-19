import { MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";
import { ToastAction, ToastState } from "./types";

export const initState: ToastState = {
  show: false,
  msg: "",
  severity: "error",
};

export const toastReducer = (
  state: ToastState,
  action: ToastAction
): ToastState => {
  const { type, payload } = action;

  switch (type) {
    case "close":
      return {
        ...state,
        show: false,
        msg: "",
      };
    case "loading":
      return {
        ...state,
        msg: TOAST_MSG_LOADING,
        severity: "warning",
        show: true,
      };
    case "long":
      return {
        ...state,
        msg: TOAST_MSG_LONGER,
        severity: "warning",
        show: true,
      };
    case "timeout":
      return {
        ...state,
        msg: MSG_SOMETHING_WENT_WRONG,
        severity: "error",
        show: true,
      };
    default:
      return {
        ...state,
        msg: payload ? payload : "",
        severity: type,
        show: true,
      };
  }
};
