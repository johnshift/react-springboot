import Landing from '../landing';

type Props = {
  loggedIn: boolean;
  path: string;
};

const Home = ({ loggedIn }: Props) => {
  if (!loggedIn) {
    return <Landing />;
  }

  return (
    <div class="flex container mx-auto h-screen justify-center items-center">
      <h1 class="text-6xl">Home Page</h1>
    </div>
  );
};

export default Home;
