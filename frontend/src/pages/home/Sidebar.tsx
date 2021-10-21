import { Link } from 'preact-router/match';
import Center from '../../components/Center';

const UpperSidebar = () => (
  <div class="flex h-240px w-full justify-end">
    <div
      class="
            md:w-6/20 lg:w-5/22 xl:w-4/26
            fixed space-y-2
          "
    >
      <Link href="/someuser">
        <button
          type="button"
          class="w-full h-18 text-gray-700 hover:bg-pink-900 hover:text-gray-100 text-lg px-5  py-4 text-center inline-flex justify-start items-center mr-3 focus:outline-none"
        >
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
          <span class="pl-2">Profile</span>
        </button>
      </Link>
      <Link href="/someveil">
        <button
          type="button"
          class="w-full h-18 text-gray-700 hover:bg-pink-900 hover:text-gray-100 text-lg px-5  py-4 text-center inline-flex justify-start items-center mr-3 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
          <span class="pl-2">Veil</span>
        </button>
      </Link>
      <Link href="/somegroup">
        <button
          type="button"
          class="w-full h-18 text-gray-700 hover:bg-pink-900 hover:text-gray-100 text-lg px-5  py-4 text-center inline-flex justify-start items-center mr-3 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span class="pl-2">Groups</span>
        </button>
      </Link>
    </div>
  </div>
);

const LowerSidebar = () => (
  <div class="flex w-full justify-end">
    <div
      class="
            fixed
            md:w-6/20 lg:w-5/22 xl:w-4/26
            space-y-5
          "
    >
      <RecentActivity />
      <ConfirmRequests />
    </div>
  </div>
);

const RecentActivity = () => (
  <div class="h-200px xl:h-275px border-2 border-purple-800">
    <Center>
      <span>Recent Activity (Collapsible)</span>
    </Center>
  </div>
);

const ConfirmRequests = () => (
  <div class="h-200px xl:h-275px border-2 border-purple-800">
    <Center>
      <span>Confirm Requests (Collapsible)</span>
    </Center>
  </div>
);

const Sidebar = () => (
  <div
    class="
        sm:hidden
        md:w-7/20 lg:w-8/20 xl:w-7/20
      "
  >
    <UpperSidebar />
    <LowerSidebar />
  </div>
);

export default Sidebar;
