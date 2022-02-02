import PageLoader from "../common/components/loaders/PageLoader";
import SomethingWentWrong from "../common/components/page-template/SomethingWentWrong";
import usePrettyRoute from "../features/pretty-route/usePrettyRoute";
import ProfilePage from "../features/profile";
import VeilProfilePage from "../features/veil-profile";
import NotFoundPage from "./404";

const PrettyRoute = () => {
  const { type, isLoading, error, name, description } = usePrettyRoute();

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <SomethingWentWrong />;
  }

  if (type === "PROFILE") {
    return <ProfilePage name={name} description={description} />;
  }

  if (type === "VEIL") {
    return <VeilProfilePage name={name} description={description} />;
  }

  return <NotFoundPage />;
};

export default PrettyRoute;
