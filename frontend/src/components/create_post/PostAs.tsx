import { useState } from 'preact/hooks';
import IconButton from '../../components/reusable/IconButton';
import UserSvg from '../../components/svg/UserSvg';
import VeilSvg from '../../components/svg/VeilSvg';

type PostAsProps = {
  // eslint-disable-next-line no-unused-vars
  setShow: (show: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setAsUser: (asUser: boolean) => void;
};

const PostAsOptions = ({ setShow, setAsUser }: PostAsProps) => (
  <div
    class="
          absolute mt-6 w-40 rounded-md shadow-lg bg-white focus:outline-none z-2 text-left
          right-8 
          md:right-20
          lg:left-998px lg:mr-15
          xl:left-1295px  xl:mr-80
          "
    tabIndex={-1}
  >
    {/* USER */}
    <button
      type="button"
      aria-label="Post As"
      onClick={() => {
        setShow(false);
        setAsUser(true);
      }}
      class="w-full text-gray-700 hover:bg-pink-900 hover:text-gray-100 text-sm pl-3 py-2 inline-flex items-center mr-3 focus:outline-none"
    >
      <UserSvg />
      <span class="pl-2 text-xs">
        Post as <span class="font-bold">John</span>
      </span>
    </button>
    {/* VEIL */}
    <button
      type="button"
      onClick={() => {
        setShow(false);
        setAsUser(false);
      }}
      class="w-full text-gray-700 hover:bg-pink-900 hover:text-gray-100 text-sm pl-3 py-2 inline-flex items-center mr-3 focus:outline-none"
    >
      <VeilSvg />
      <span class="pl-2 text-xs">
        Post using <span class="font-bold">Veil</span>
      </span>
    </button>
  </div>
);

const PostAs = () => {
  const [show, setShow] = useState(false);
  const [asUser, setAsUser] = useState(true);

  return (
    <>
      <IconButton
        icon={asUser ? <UserSvg /> : <VeilSvg />}
        label="Post as User or Veil"
        className="text-white bg-pink-800 hover:bg-pink-700 font-medium text-sm p-2.5 text-center inline-flex items-center mr-3 focus:outline-none"
        onClick={() => setShow(!show)}
      />
      <div class={show ? 'visible' : 'hidden'}>
        <div class="fixed top-0 left-0 h-screen w-screen z-1" onClick={() => setShow(false)} />
        <PostAsOptions setShow={setShow} setAsUser={setAsUser} />
      </div>
    </>
  );
};

export default PostAs;
