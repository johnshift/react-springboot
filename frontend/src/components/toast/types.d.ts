import { AlertColor } from "@mui/material/Alert";

export interface ToastState {
  show: boolean;
  msg: string;
  severity: "success" | "error" | "warning";
}

export interface ToastAction {
  type: "success" | "error" | "loading" | "long" | "timeout" | "close";
  payload?: string;
}
