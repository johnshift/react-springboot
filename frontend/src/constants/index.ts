// URI
let BACKEND_URL = 'https://veils.heroku.app/api/v1';
if (import.meta.env.DEV) {
  BACKEND_URL = 'http://localhost:8080/api/v1';
}
export const CSRF_TOKEN_URI = BACKEND_URL + '/session/csrf-token';
export const LOGIN_URI = BACKEND_URL + '/login';

// SERVER SPECIFIC
export const CSRF_HEADER_KEY = 'x-veils-csrf-token';
