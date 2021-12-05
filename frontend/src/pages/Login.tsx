import { useState } from 'preact/hooks';
import { useAtom } from 'jotai';
import { csrfTokenAtom } from '../jotai/csrfToken';
import { getCsrfToken } from '../api';
import { apiLogin } from '../api/login';

type SessionCsrfResponse = {
  ['csrf-token']: string;
};

const Login = () => {
  const [csrfToken, setCsrfToken] = useAtom(csrfTokenAtom);
  const [principal, setPrincipal] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglepassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    if (!csrfToken) {
      console.log('fetching token ...');
      const token = await getCsrfToken();
      console.log('token: ', token);
      setCsrfToken(token);
    }
    console.log('principal: ', principal);
    console.log('password: ', password);
    console.log('login clicked');

    await apiLogin(principal, password, csrfToken);
  };

  return (
    <div class="flex container mx-auto h-screen justify-center items-center">
      <div>
        <h1>Login</h1>
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
        <button aria-label="show password" onClick={togglepassword}>
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
