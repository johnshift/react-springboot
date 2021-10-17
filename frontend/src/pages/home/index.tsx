import { loggedIn } from '../../store/auth';

import Landing from '../landing';
import Content from './Content';
import Sidebar from './Sidebar';

const Home = () => {
  if (!loggedIn()) {
    return <Landing />;
  }

  return (
    <div class="flex top-20px content-start justify-around sm:mx-auto px-3">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Home;
