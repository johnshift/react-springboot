import { h } from "preact";
import Center from "../common/Center";
import MenuSvg from "../svg/MenuSvg";
import SearchSvg from "../svg/SearchSvg";

const Brand = () => (
  <div class="basis-2/12 md:basis-4/12 lg:basis-2/12">
    <div class="flex h-full justify-self-start items-center">
      <a
        type="button"
        aria-label="veils brand"
        href="/"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <span class="text-3xl font-bold">veils</span>
      </a>
    </div>
  </div>
);

const SearchBar = () => (
  <div class="basis-9/12 md:basis-5/12 hd:basis-4/12 invisible md:visible">
    <div class="flex h-full px-2 justify-end items-center md:px-0 md:pl-5">
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
  return (
    <div class="basis-1/12 md:basis-1/12">
      <Center>
        <MenuSvg />
      </Center>
    </div>
  );
};

const Nav = () => (
  <div className="w-full shadow-md fixed bg-light-50 z-3">
    <div class="flex h-16 justify-center px-3 md:px-0">
      <Brand />
      <SearchBar />
      <Menu />
    </div>
  </div>
);

export default Nav;
