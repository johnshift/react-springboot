import { useState } from 'preact/hooks';

const VeilSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const UserSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
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
      <button
        type="button"
        onClick={() => setShow(!show)}
        class="text-white bg-pink-800 hover:bg-pink-700 font-medium text-sm p-2.5 text-center inline-flex items-center mr-3 focus:outline-none"
      >
        {asUser && <UserSvg />}
        {!asUser && <VeilSvg />}
      </button>
      <div class={show ? 'visible' : 'hidden'}>
        <div class="fixed top-0 left-0 h-screen w-screen z-1" onClick={() => setShow(false)} />
        <PostAsOptions setShow={setShow} setAsUser={setAsUser} />
      </div>
    </>
  );
};

export default PostAs;
