import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { MSG_PLEASE_LOGIN, TOAST_OPTIONS } from "../../lib/constants";
import { useAuth } from "../../lib/contexts/auth";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import PageCenter from "../layout/PageCenter";

const Token = () => {
  const router = useRouter();

  const { authLoading, isAuthenticated, authLogout } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login").then(() => {
        toast(MSG_PLEASE_LOGIN, TOAST_OPTIONS);
      });
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
