import PageLoader from "../common/components/loaders/PageLoader";
import usePrettyRoute from "../features/pretty-route/usePrettyRoute";

const PrettyRoute = () => {
  const { type, prettyRoute, isLoading, error } = usePrettyRoute();

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <h1>Something went wrong :(</h1>;
  }

  if (type === "NOT_FOUND") {
    return <h1>NOT FOUND :(</h1>;
  }

  return (
    <div>
      <p>prettyRoute = {prettyRoute} </p>
      <p>type = {type} </p>
    </div>
  );
};

export default PrettyRoute;
