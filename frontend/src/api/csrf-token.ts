import axios from 'axios';
import { CSRF_HEADER_KEY, CSRF_TOKEN_URI } from '../constants';

export const getCsrfToken = async (): Promise<string> => {
  let token = '';

  await axios.get(CSRF_TOKEN_URI, { withCredentials: true }).then((res) => {
    token = res.data;
  });

  return token;
};
