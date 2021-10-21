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
        pt-25 w-full mx-auto md:w-9/10 lg:w-6/10 xl:w-45/100 z-1"
    >
      <div class="flex top-20px sm:mx-auto justify-around md:px-3 md:space-x-5">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};

export default Home;
