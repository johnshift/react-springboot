import { MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";

export type ToastMsgLoading =
  | typeof TOAST_MSG_LOADING
  | typeof TOAST_MSG_LONGER;

export type ToastMsgError = typeof MSG_SOMETHING_WENT_WRONG;

export interface ToastSlice {
  show: boolean;
  msg: ToastMsgLoading | ToastMsgError | undefined;
  severity: "success" | "error" | "warning";
}

export interface ToastErrorAction {
  msg: ToastMsgError;
}
