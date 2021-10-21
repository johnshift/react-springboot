import { Link } from 'preact-router/match';
import Center from '../../components/Center';

const UpperSidebar = () => (
  <div class="flex h-240px w-full justify-end">
    <div
      class="
            md:w-6/20 lg:w-5/22 xl:w-5/26
            fixed space-y-2
          "
    >
      <Link href="/someuser">
        <button class="border-2 border-red-500 h-18 w-full hover:bg-light-700">
          <span>Profile</span>
        </button>
      </Link>
      <Link href="/someveil">
        <button class="border-2 border-red-500 h-18 w-full hover:bg-light-700">
          <span>Veil Profile</span>
        </button>
      </Link>
      <Link href="/somegroup">
        <button class="border-2 border-red-500 h-18 w-full hover:bg-light-700">
          <span>Group</span>
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
            md:w-6/20 lg:w-5/22 xl:w-5/26
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
        md:w-7/20 lg:w-7/20 xl:w-7/20
      "
  >
    <UpperSidebar />
    <LowerSidebar />
  </div>
);

export default Sidebar;
