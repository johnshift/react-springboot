import { loggedIn } from '../../store/auth';

import Landing from '../landing';
import Center from '../../components/Center';

const Home = () => {
  if (!loggedIn()) {
    return <Landing />;
  }

  return (
    <div class="flex top-20px border-2 border-red-500 content-start space-x-10px ">
      <div
        class="
        sm:hidden border-3 border-500-blue
        md:w-8/20 lg:w-7/20 xl:w-8/20
      "
      >
        <div class="border-2 border-blue-500 h-250px w-full">
          <Center>
            <span>Profile, Alias, Groups</span>
          </Center>
        </div>
        <div class="border-2 border-blue-500 h-380px w-full">
          <Center>
            <span>Recent Activity</span>
          </Center>
        </div>
        <div class="border-2 border-blue-500 h-300px w-full">
          <Center>
            <span>Confirm Requests</span>
          </Center>
        </div>
      </div>
      <div
        class="
        border-3 border-500-blue h-1200px
        w-full
        md:w-12/20 lg:w-13/20 xl:w-12/20
      "
      >
        <div class="border-2 border-blue-500 h-300px w-full">
          <Center>
            <span>Create Post</span>
          </Center>
        </div>
        <div class="border-2 border-blue-500 h-900px w-full">
          <Center>
            <span>Feed</span>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default Home;
