// import { Link } from 'preact-router/match';
import Center from '../../components/Center';
import NavLink from '../../components/reusable/NavLink';
import GroupSvg from '../../components/svg/GroupSvg';
import HomeSvg from '../../components/svg/HomeSvg';
import UserSvg from '../../components/svg/UserSvg';
// import VeilSvg from '../../components/svg/VeilSvg';

const UpperSidebar = () => (
  <div class="flex h-240px w-full justify-end">
    <div
      class="
            md:w-6/20 lg:w-5/22 xl:w-4/26
            fixed space-y-2
          "
    >
      <NavLink text="Home" icon={<HomeSvg />} path="/" />
      <NavLink text="Profile" icon={<UserSvg />} path="/someuser" />
      <NavLink text="Veil" icon={<UserSvg />} path="/someveil" />
      <NavLink text="Groups" icon={<GroupSvg />} path="/somegroup" />
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
    aria-label="sidebar"
    role="navigation"
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
