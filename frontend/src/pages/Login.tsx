import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { apiLogin, getLocalJwt } from '../api';

const Login = () => {
  // redirect to homepage if already loggedin
  if (getLocalJwt()) {
    alert('you are already logged in!');
    route('/', true);
  }

  const [principal, setPrincipal] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglepassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    console.log('principal: ', principal);
    console.log('password: ', password);
    console.log('login clicked');

    const token = await apiLogin(principal, password);
    alert('token received ' + token);
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
