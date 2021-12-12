// backend_api_url is overriden as localhost at .env.local
// note that .env.local is purposely included at .gitignore
// so that it will not be uploaded to public github repository
// and would not be visible during unit tests as axios is mocked
// if .env.local is not loaded, defaults to backend url in production
// NOTE: issues might occur on end-to-end tests as it is deployed on different url
//			 since backend api is located at `https://veils-dev.herokuapp.com/api/v1`
let BACKEND_API_URL =
  process.env.BACKEND_API_URL || "https://veils.herokuapp.com/api/v1";

export const MSG_SOMETHING_WENT_WRONG = "Something went wrong :(";
export const MSG_LOGIN_SUCCESSFUL = "You have successfully logged in";
export const MSG_LOGOUT_SUCCESSFUL = "You have successfully logged out";
export const MSG_ALREADY_LOGGED_IN = "You are already logged in";
export const MSG_LOGIN_FIRST = "Please login first";

export const LOGIN_URL = BACKEND_API_URL + "/login";

export const AUTHORIZATION_KEY = "authorization";

export const TOAST_STATUS_SUCCESS = "success";
export const TOAST_STATUS_ERROR = "error";
export const TOAST_STATUS_INFO = "info";
export const DEFAULT_TOAST_DURATION = 4000;

export const DEMO_WELCOME_MESSAGE = "You have logged in for DEMO";
export const DEMO_PRINCIPAL = "demo";
export const DEMO_PASSWORD = "12345678";

export const API_LOGIN_URL = "/api/login";
