/**
 * NOTE: All code here is bundled on critical JS (if more than 1 module uses the variable)
 */
export const REGEXP_NEAT_URI = /^[a-zA-Z][a-zA-Z0-9-]*$/;
export const REGEXP_EMAIL = new RegExp(
  "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
);

export const MSG_SOMETHING_WENT_WRONG = "Something went wrong :(";

/**
 * BACKEND_API_URL: used in different test environment + production
 * 		unit/integration test: http://localhost:8080/api/v1
 * 		github-actions ci: https://veils-dev.herokuapp.com/api/v1
 * 		production: https://veils.herokuapp.com/api/v1
 */
export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
