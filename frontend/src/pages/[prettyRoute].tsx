import PageLoader from "../common/components/loaders/PageLoader";
import SomethingWentWrong from "../common/components/page-template/SomethingWentWrong";
import usePrettyRoute from "../features/pretty-route/usePrettyRoute";
import ProfilePage from "../features/profile";
import NotFoundPage from "./404";

const PrettyRoute = () => {
  const { type, isLoading, error } = usePrettyRoute();

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <SomethingWentWrong />;
  }

  if (type === "PROFILE") {
    return <ProfilePage name="John Ballesteros" />;
  }

  return <NotFoundPage />;
};

export default PrettyRoute;
