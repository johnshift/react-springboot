const BACKEND_API_URL = import.meta.env.PUBLIC_BACKEND_API_URL;
export const LOGIN_API_URL = BACKEND_API_URL + "/login";

export const DEFAULT_NOTIFICATION_DURATION = 3000;
export const DEFAULT_NOTIFICATION_TYPE = "info";

export const MSG_SOMETHING_WENT_WRONG = "Something went wrong :(";
export const MSG_SUCCESSFUL_LOGIN = "You have successfully loggedin";

export const METHOD_POST = "POST";
export const JSON_HEADERS = {
  "Content-Type": "application/json",
};
