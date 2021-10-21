import { apiRouteInfo, PageType } from '../../api/routeInfo';
import Group from '../group';
import NotFound from '../notfound';
import ProfileUser from '../profile_user';
import ProfileVeil from '../profile_veil';

type Props = {
  path: string;
};

const PrettyRoute = ({ path }: Props) => {
  const pageType = apiRouteInfo(path);

  switch (pageType) {
    case PageType.User:
      return <ProfileUser />;
    case PageType.Veil:
      return <ProfileVeil />;
    case PageType.Group:
      return <Group />;
    default:
      return <NotFound />;
  }
};

export default PrettyRoute;
