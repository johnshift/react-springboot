import { ReactNode } from "react";
import Center from "../components/layout/Center";
import MenuSvg from "../components/svg/MenuSvg";

const Brand = () => (
  <div className="w-8/24 md:w-12/24 xl:w-6/10">
    <div className="flex h-full justify-self-start items-center pl-5">
      <a
        type="button"
        aria-label="veils brand"
        href="/"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <span className="text-5xl font-bold text-red-800">veils</span>
      </a>
    </div>
  </div>
);

const Searchbar = () => (
  <div className="w-12/24 md:w-9/24 xl:w-3/10">
    <div className="flex h-full justify-end items-center pl-5 sm:hidden ">
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
          className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="looking for someone?"
        />
      </div>
    </div>
  </div>
);

const Menu = () => {
  return (
    <div className="md:w-3/24 w-4/24 xl:w-1/10">
      <Center>
        <button
          type="button"
          aria-label="options menu"
          className="p-3 rounded-lg hover:bg-light-800 hover:text-red-800"
        >
          <MenuSvg />
        </button>
      </Center>
    </div>
  );
};

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="w-full shadow-md fixed bg-light-300 z-3">
      <div className="flex h-20 lg:mx-auto lg:w-1100px">{children}</div>
    </nav>
  );
};

const TestPage = () => {
  return (
    <>
      {/* Nav */}
      <Navbar>
        <Brand />
        <Searchbar />
        <Menu />
      </Navbar>
    </>
  );
};

export default TestPage;