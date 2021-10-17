import { loggedIn } from '../../store/auth';

import Landing from '../landing';
import PageCenter from '../../components/PageCenter';

const Home = () => {
  if (!loggedIn()) {
    return <Landing />;
  }

  return (
    <PageCenter>
      <h1 class="text-6xl">Home Page</h1>
    </PageCenter>
  );
};

export default Home;
