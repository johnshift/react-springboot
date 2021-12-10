import Center from "../layout/Center";
import MenuSvg from "../svg/MenuSvg";
import SearchSvg from "../svg/SearchSvg";

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
    <div className="flex h-full justify-end items-center pl-5 sm:hidden">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchSvg />
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

const Navbar = () => {
  return (
    <nav className="w-full shadow-md fixed bg-light-300 top-0 py-2 z-3">
      <div className="flex lg:mx-auto lg:w-1100px">
        <Brand />
        <Searchbar />
        <Menu />
      </div>
    </nav>
  );
};

export default Navbar;
