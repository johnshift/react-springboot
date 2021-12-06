import { getLocalJwt } from '../api';

const Home = () => {
  const token = getLocalJwt();

  return (
    <div class="flex container mx-auto h-screen justify-center items-center">
      <p>jwt token: "{token}"</p>
    </div>
  );
};

export default Home;
