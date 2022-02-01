import axios from "axios";
import { useQuery } from "react-query";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useToast from "../toast/useToast";

const usePrettyRoute = () => {
  const router = useRouter();
  let { prettyRoute } = router.query;

  if (typeof prettyRoute === "string") {
    prettyRoute = prettyRoute.toLowerCase();
  }

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [type, setType] = useState<PrettyRouteType>("NOT_FOUND");

  const { toastError } = useToast();

  useEffect(() => {
    if (router.isReady) {
      axios
        .get<PrettyRouteResponse>(
          BACKEND_API_URL + "/pretty-route/" + prettyRoute
        )
        .then((res) => {
          setType(res.data.type);
        })
        .catch(() => {
          toastError(MSG_SOMETHING_WENT_WRONG);
          setError(MSG_SOMETHING_WENT_WRONG);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [prettyRoute, router.isReady, toastError]);

  return {
    type,
    prettyRoute,
    isLoading,
    error,
  };
};

export default usePrettyRoute;
