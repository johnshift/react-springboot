import axios from "axios";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const usePrettyRoute = () => {
  const router = useRouter();
  let { prettyRoute } = router.query;

  if (typeof prettyRoute === "string") {
    prettyRoute = prettyRoute.toLowerCase();
  }

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [type, setType] = useState<PrettyRouteType>("NOT_FOUND");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (router.isReady) {
      axios
        .get<PrettyRouteResponse>(
          BACKEND_API_URL + "/pretty-route/" + prettyRoute
        )
        .then((res) => {
          const {
            type: _type,
            name: _name,
            description: _description,
          } = res.data;
          setType(_type);
          setName(_name);
          setDescription(_description || "Click to edit description");
        })
        .catch(() => {
          setError(MSG_SOMETHING_WENT_WRONG);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [prettyRoute, router.isReady]);

  return {
    type,
    isLoading,
    error,
    name,
    description,
  };
};

export default usePrettyRoute;
