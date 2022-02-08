import { MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { LOGIN_MSG_INCORRECT, LOGIN_MSG_OK } from "../login/constants";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";

export type ToastMsgLoading =
  | typeof TOAST_MSG_LOADING
  | typeof TOAST_MSG_LONGER;

export type ToastMsgError =
  | typeof MSG_SOMETHING_WENT_WRONG
  | typeof LOGIN_MSG_INCORRECT
  | string;

export type ToastMsgSuccess = typeof LOGIN_MSG_OK | string;

export interface ToastSlice {
  show: boolean;
  msg: ToastMsgLoading | ToastMsgError | ToastMsgSuccess | undefined;
  severity: "success" | "error" | "warning";
}

export interface ToastErrorAction {
  msg: ToastMsgError;
}

export interface ToastSuccessAction {
  msg: ToastMsgSuccess;
}
