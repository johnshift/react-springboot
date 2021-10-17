import Center from '../../components/Center';

const Content = () => (
  <div
    class="
        border-3 border-500-blue h-1200px
        w-full
        md:w-12/20 lg:w-12/20 xl:w-12/20
      "
  >
    <div class="border-2 border-blue-500 h-300px w-full mb-5">
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
);

export default Content;
