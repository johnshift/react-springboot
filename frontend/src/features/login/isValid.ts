import { REGEXP_EMAIL, REGEXP_NEAT_URI } from "../../constants";

const isValid = (principal: string, password: string) => {
  const MIN_PRINCIPAL_LENGTH = 4;
  const MIN_PASSWORD_LENGTH = 6;
  const MAX_LOGIN_INPUT_LENGTH = 64;

  if (!principal) {
    return false;
  }

  if (!password) {
    return false;
  }

  if (
    principal.length < MIN_PRINCIPAL_LENGTH ||
    principal.length > MAX_LOGIN_INPUT_LENGTH
  ) {
    return false;
  }

  if (
    password.length < MIN_PASSWORD_LENGTH ||
    password.length > MAX_LOGIN_INPUT_LENGTH
  ) {
    return false;
  }

  if (!REGEXP_NEAT_URI.test(principal) && !REGEXP_EMAIL.test(principal)) {
    return false;
  }

  return true;
};

export default isValid;
