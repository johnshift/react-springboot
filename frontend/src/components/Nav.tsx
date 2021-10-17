import { Link } from 'preact-router/match';
import Center from './Center';

const Nav = () => (
  <div className="w-full shadow-md fixed bg-light-50 z-3">
    <div
      class="
      flex h-20 z-60
      xl:mx-auto xl:w-1100px
    "
    >
      <div class="w-8/24 md:w-12/24 xl:w-6/10">
        <div class="flex h-full justify-self-start items-center pl-5">
          <Link href="/">
            <span class="text-3xl font-bold">veils</span>
          </Link>
        </div>
      </div>
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
      <div class="md:w-3/24 w-4/24 xl:w-1/10">
        <Center>
          <button class="outline-none focus:outline-none">
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
          </button>
        </Center>
      </div>
    </div>
  </div>
);

export default Nav;
