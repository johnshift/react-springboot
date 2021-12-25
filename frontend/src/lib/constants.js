export const BACKEND_API_URL = import.meta.env.PUBLIC_BACKEND_API_URL;

export const MSG_SOMETHING_WENT_WRONG = "Something went wrong :(";
export const MSG_LOADING = "Loading please wait";

// login related
export const MSG_INCORRECT_LOGIN = "Incorrect username/email or password";
export const MIN_PRINCIPAL_LENGTH = 4;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_NAME_LENGTH = 36;
export const MAX_LOGIN_INPUT_LENGTH = 64;
export const REGEXP_NEAT_URI = /^[a-zA-Z][a-zA-Z0-9-]*$/;
export const REGEXP_EMAIL = new RegExp(
  "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
);

export const REGEXP_VALID_NAME = /^[a-z ,.'-]+$/i;
export const REGEXP_VALID_PRINCIPAL = new RegExp(
  "^[a-zA-Z][a-zA-Z0-9-]{3,63}$"
);

export const KEY_AUTHORIZATION = "authorization";

// register
export const MSG_INVALID_USERNAME = "Username is invalid";
export const MSG_INVALID_EMAIL = "Email is invalid";
export const MSG_INVALID_PASSWORD = "Password is invalid";
export const MSG_INVALID_NAME = "Full name is invalid";
export const MSG_INVALID_VEIL = "Veil name is invalid";
export const DEFAULT_FIELD_ERR = {
  field: -1,
  err: "",
};
