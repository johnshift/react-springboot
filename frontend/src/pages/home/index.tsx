import { loggedIn } from '../../store/auth';

import Landing from '../landing';
import Content from './Content';
import Sidebar from './Sidebar';

const Home = () => {
  if (!loggedIn()) {
    return <Landing />;
  }

  return (
    <div
      class="
        pt-25 w-full mx-auto md:w-9/10 lg:w-8/10 xl:w-50/100 z-1"
    >
      <div class="flex top-20px content-start justify-around sm:mx-auto px-3">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default Home;
