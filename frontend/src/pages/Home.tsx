import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { JWT_HEADER_KEY } from '../constants';

const Home = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(JWT_HEADER_KEY);
    if (!token) {
      setLocation('/login');
    }
  }, []);

  return (
    <div className="flex conainer mx-auto h-screen justify-center items-center">
      <p>Home Page</p>
    </div>
  );
};

export default Home;
