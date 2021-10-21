import Center from '../../components/Center';
import CreatePost from './CreatePost';

const Content = () => (
  <div
    class="
        h-1200px
        w-full
        md:w-12/20 lg:w-12/20 xl:w-13/20
      "
  >
    <CreatePost />
    <div class="border-2 border-blue-500 h-900px w-full">
      <Center>
        <span>Feed</span>
      </Center>
    </div>
  </div>
);

export default Content;
