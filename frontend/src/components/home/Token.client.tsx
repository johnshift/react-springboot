import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  MSG_PLEASE_LOGIN,
  MSG_SUCCESSFUL_LOGOUT,
  TOAST_OPTIONS,
} from "../../lib/constants";
import { useAuth } from "../../lib/contexts/auth";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import PageCenter from "../layout/PageCenter";

const Token = () => {
  const router = useRouter();

  const { authLoading, isAuthenticated, authLogout, setAuthLoading } =
    useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setAuthLoading(true);
      router.replace("/login").then(() => {
        setAuthLoading(false);
        toast(MSG_PLEASE_LOGIN, TOAST_OPTIONS);
      });
    }
  }, [isAuthenticated, authLoading, router, setAuthLoading]);

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
      <Button
        onClick={() => {
          authLogout();
          router.push("/login").then(() => {
            setAuthLoading(false);
            toast.success(MSG_SUCCESSFUL_LOGOUT, TOAST_OPTIONS);
          });
        }}
      >
        LOGOUT
      </Button>
    </div>
  );
};

export default Token;
