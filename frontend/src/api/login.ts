import axios from 'axios';
import { route } from 'preact-router';
import { LOGIN_URI, AUTHORIZATION_HEADER_KEY, JWT_LOCALSTORAGE_KEY } from '../constants';

export const apiLogin = async (principal: string, password: string): Promise<string> => {
  console.log('apiLogin called -> principal =', principal, ' password =', password);

  let token = '';

  await axios
    .post(
      LOGIN_URI,
      { principal, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      token = res.headers[AUTHORIZATION_HEADER_KEY];
      console.log('jwt-token = ', token);

      // save token to localStorage
      localStorage.setItem(JWT_LOCALSTORAGE_KEY, token);
    })
    .catch((err) => {
      console.log('login error: ', err);
    });

  return token;
};

/**
 * Checks if a jwt-token is present in localStorage.
 * @returns jwt
 */
export const getLocalJwt = (): string => {
  const token = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
  console.log('getLocalJwt token = ', token);
  if (!token) {
    route('/login', true);
    return '';
  }

  return token;
};
