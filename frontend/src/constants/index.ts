// const BACKEND_URL = 'https://veils.heroku.app/api/v1';
const BACKEND_URL = 'http://localhost:8080/api/v1';

export const LOGIN_URI = BACKEND_URL + '/login';

export const JWT_HEADER_KEY = 'authorization';

export const LOGIN_SUCCESS_MSG = 'You have successfully loggedin!';
export const LOGIN_INCORRECT_MSG = 'Incorrect username/email or password';
