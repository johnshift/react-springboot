import { Link } from 'preact-router/match';
import Center from './Center';
import { useState, useEffect } from 'preact/hooks';

import SettingsSvg from './svg/SettingsSvg';
import LogoutSvg from './svg/LogoutSvg';
import MenuSvg from './svg/MenuSvg';
import HomeSvg from './svg/HomeSvg';

import NavLink from './reusable/NavLink';
import UserSvg from './svg/UserSvg';
import VeilSvg from './svg/VeilSvg';
import GroupSvg from './svg/GroupSvg';

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

const Menu = () => {
  const [show, setShow] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const pathname = window.location.pathname;

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          absolute -mt-3 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-2 text-center
          right-5 md:right-8 lg:right-46 xl:right-112
          "
          tabIndex={-1}
        >
          <div
            onClick={() => {
              setShow(false);
            }}
          >
            <div class={screenWidth > 767 && pathname != '/' ? 'visible' : 'md:hidden'}>
              <NavLink text="Home" icon={<HomeSvg />} path="/" />
              <NavLink text="Profile" icon={<UserSvg />} path="/someuser" />
              <NavLink text="Veil" icon={<VeilSvg />} path="/someveil" />
              <NavLink text="Groups" icon={<GroupSvg />} path="/somegroup" />
            </div>

            <NavLink text="Settings" icon={<SettingsSvg />} path="/settings" />
            <NavLink
              text="Logout"
              icon={<LogoutSvg />}
              path="#"
              onClick={() => {
                console.log('todo logout');
              }}
            />
          </div>
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
