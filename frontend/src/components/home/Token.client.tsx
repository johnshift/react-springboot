import Router from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { MSG_ALREADY_LOGGEDIN, TOAST_OPTIONS } from "../../lib/constants";
import { useAuth } from "../../lib/contexts/auth";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import PageCenter from "../layout/PageCenter";

const Token = () => {
  const {
    authLoading,
    isAuthenticated,
    setIsRedirected,
    isRedirected,
    authLogout,
  } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setIsRedirected(true);
      Router.replace("/login");
    }

    if (isRedirected && isAuthenticated) {
      setIsRedirected(false);
      toast(MSG_ALREADY_LOGGEDIN, TOAST_OPTIONS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, authLoading]);

  if (authLoading || !isAuthenticated) {
    return (
      <PageCenter>
        <Spinner />
      </PageCenter>
    );
  }

  return (
    <div>
      <p>Home Page</p>
      <br />
      <Button onClick={authLogout}>LOGOUT</Button>
    </div>
  );
};

export default Token;
