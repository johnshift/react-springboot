import axios from 'axios';
import { CSRF_HEADER_KEY, LOGIN_URI } from '../constants';

// export const apiLogin = async (principal: string, password: string) => {
//   console.log('apiLogin called -> principal =', principal, ' password =', password);
//   await axios
//     .post(
//       LOGIN_URI,
//       { principal, password },
//       {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': 'http://localhost:3000',
//         },
//       },
//     )
//     .then((res) => {
//       const token = res.headers[CSRF_HEADER_KEY];
//       console.log('successful login token = ', token);

//       // set csrf-token as default header
//       axios.defaults.headers.common[CSRF_HEADER_KEY] = token;
//     })
//     .catch((err) => {
//       console.log('login error: ', err);
//     });
// };

export const apiLogin = async (principal: string, password: string, csrfToken: string) => {
  console.log('apiLogin called -> principal =', principal, ' password =', password);

  await fetch(LOGIN_URI, {
    credentials: 'include',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // [CSRF_HEADER_KEY]: csrfToken,
    },
    body: JSON.stringify({ principal, password }),
  })
    .then((res) => res.json())
    .then((res) => console.log('res: ', res))
    .catch((err) => {
      console.log('apiLogin err: ', err);
    });
};
