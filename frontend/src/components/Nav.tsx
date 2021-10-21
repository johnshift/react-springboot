import { Link } from 'preact-router/match';
import Center from './Center';
import { useState } from 'preact/hooks';

const Brand = () => (
  <div class="w-8/24 md:w-12/24 xl:w-6/10">
    <div class="flex h-full justify-self-start items-center pl-5">
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span class="text-3xl font-bold">veils</span>
      </Link>
    </div>
  </div>
);
const Searchbar = () => (
  <div class="w-12/24 md:w-9/24 xl:w-3/10">
    <div class="flex h-full justify-end items-center pl-5">
      <div class="mt-1 relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="looking for someone?"
        />
      </div>
    </div>
  </div>
);

const MenuSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const Menu = () => {
  const [show, setShow] = useState(false);

  return (
    <div class="md:w-3/24 w-4/24 xl:w-1/10">
      <Center>
        <button class="outline-none focus:outline-none z-2" onClick={() => setShow(!show)}>
          <MenuSvg />
        </button>
      </Center>

      <div class={show ? 'visible' : 'hidden'}>
        <div class="fixed top-0 left-0 h-screen w-screen z-1" onClick={() => setShow(false)} />
        <div
          class="
          absolute -mt-3 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-2 text-center
          right-5 md:right-8 lg:right-46 xl:right-112
          "
          tabIndex={-1}
        >
          <button
            type="button"
            class="w-30 text-gray-700 hover:bg-pink-900 hover:text-gray-100 text-sm px-5  py-4 text-center inline-flex items-center mr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="pl-2">Settings</span>
          </button>
          <button
            type="button"
            class="w-30 text-gray-700 hover:bg-pink-900 hover:text-gray-100 text-sm px-5 py-4 text-center inline-flex items-center mr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <span class="pl-2">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Nav = () => (
  <div className="w-full shadow-md fixed bg-light-50 z-3">
    <div
      class="
      flex h-20 z-60
      lg:mx-auto lg:w-1100px
    "
    >
      <Brand />
      <Searchbar />
      <Menu />
    </div>
  </div>
);

export default Nav;
