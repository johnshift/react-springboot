import { route } from 'preact-router';
import { loggedIn } from '../../store/auth';
import Center from '../../components/Center';

const CoverPhoto = () => (
  <div
    class="
        h-200px 
        bg-true-gray-400
        "
  >
    <Center>
      <h1>cover photo</h1>
    </Center>
  </div>
);

const ProfilePicture = () => (
  <div
    class="
      w-4/10 
      bg-true-gray-400 border-2 rounded-full
      h-120px w-120px
      md:h-200px md:w-200px
      lg:h-250px lg:w-250px
      ml-3 lg:ml-10
    "
  >
    <Center>Picture</Center>
  </div>
);

const Name = () => (
  <div
    class="
    w-6/10 
    pt-18 md:pt-22
  "
  >
    <span
      class="
      text-2xl md:text-3xl lg:text-4xl
    "
    >
      Juan de la Cruz
    </span>
  </div>
);

const Head = () => (
  <div
    class="
        flex justify-between
        h-130px md:h-150px
        -mt-50px
        "
  >
    <ProfilePicture />
    <Name />
  </div>
);

const Info = () => (
  <div
    class="
        h-200px 
        bg-true-gray-300
        "
  >
    <Center>
      <h1>Info + buttons</h1>
    </Center>
  </div>
);

const Content = () => (
  <div
    class="
        h-200px 
        bg-true-gray-200
        "
  >
    <Center>
      <h1>Content</h1>
    </Center>
  </div>
);

const ProfileUser = () => {
  if (!loggedIn()) {
    route('/', true);
  }

  return (
    <div
      class="
      pt-25 mx-auto
      md:w-9/10 lg:w-7/10 xl:w-5/10
    "
    >
      <CoverPhoto />
      <Head />
      <Info />
      <Content />
    </div>
  );
};

export default ProfileUser;
