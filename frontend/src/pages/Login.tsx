import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { JWT_HEADER_KEY, LOGIN_URI } from '../constants';

const Login = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // redirect to homepage if already logged in
    if (localStorage.getItem(JWT_HEADER_KEY)) {
      setLocation('/');
    }
  }, []);

  const [principal, setPrincipal] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [err, setError] = useState('');
  const [msg, setMsg] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    await axios
      .post(
        LOGIN_URI,
        { principal, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        setMsg('You have successfully loggedin!');

        const token = res.headers[JWT_HEADER_KEY];

        // save token to localstorage
        localStorage.setItem(JWT_HEADER_KEY, token);

        setLocation('/');
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="flex conainer mx-auto h-screen justify-center items-center">
      <div>
        <h1>Login</h1>
        {err && (
          <>
            <br />
            <br />
            <p className="text-red-500" data-testid="errmsg">
              {err}
            </p>
          </>
        )}
        {msg && (
          <>
            <br />
            <br />
            <p className="text-green-500" data-testid="errmsg">
              {msg}
            </p>
          </>
        )}
        <br />
        <br />
        <input
          placeholder="Username or Email"
          onInput={(e) => {
            setPrincipal((e.target as HTMLInputElement).value);
          }}
        />
        <br />
        <br />
        <input
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          onInput={(e) => {
            setPassword((e.target as HTMLInputElement).value);
          }}
        />
        <br />
        <br />
        <button aria-label="show password" onClick={toggleShowPassword}>
          show password
        </button>
        <br />
        <br />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
