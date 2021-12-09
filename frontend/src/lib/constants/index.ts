import { ToastPosition } from "react-hot-toast";

export const BACKEND_API_URL = process.env.BACKEND_API_URL;
export const BACKEND_LOGIN_URL = BACKEND_API_URL + "/login";

export const DEFAULT_PAGE_TITLE = "Veils App";
export const DEFAULT_META_DESCRIPTION = "Share your secrets anonymously";

export const MSG_SUCCESSFUL_LOGIN = "You have successfully logged in!";
export const MSG_SOMETHING_WENT_WRONG = "Something went wrong :(";
export const MSG_PLEASE_LOGIN = "Please login first";
export const MSG_ALREADY_LOGGEDIN = "You are already loggedin";
export const MSG_SUCCESSFUL_LOGOUT = "You have successfully logged out";

export const AUTHORIZATION_KEY = "authorization";

export const TOAST_OPTIONS = {
  id: "1",
  position: "top-center" as ToastPosition,
};
