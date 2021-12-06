import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { JWT_HEADER_KEY } from '../constants';

const Home = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!localStorage.getItem(JWT_HEADER_KEY)) {
      setLocation('/login');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(JWT_HEADER_KEY);
    alert('You have successfully logged out!');
    setLocation('/login');
  };

  return (
    <div className="flex conainer mx-auto h-screen justify-center items-center">
      <p>Home Page</p>
      <br />
      <br />
      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default Home;
