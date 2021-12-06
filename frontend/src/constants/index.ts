let BACKEND_URL = 'https://veils.heroku.app/api/v1';
if (import.meta.env.DEV) {
  BACKEND_URL = 'http://localhost:8080/api/v1';
}

export const LOGIN_URI = BACKEND_URL + '/login';

export const JWT_HEADER_KEY = 'authorization';
