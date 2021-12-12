import { Button, Skeleton, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import {
  DEFAULT_TOAST_DURATION,
  MSG_LOGIN_FIRST,
  MSG_LOGOUT_SUCCESSFUL,
  TOAST_STATUS_INFO,
  TOAST_STATUS_SUCCESS,
} from "../lib/constants";

const Home: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const { authLoading, setAuthLoading, isAuthenticated, authLogout } =
    useAuth();

  useEffect(() => {
    const redirectToLoginPage = async () => {
      setAuthLoading(true);
      await router.push("/login").then(() => {
        setAuthLoading(false);
        toast({
          title: MSG_LOGIN_FIRST,
          status: TOAST_STATUS_INFO,
          duration: DEFAULT_TOAST_DURATION,
        });
      });
    };

    if (!authLoading && !isAuthenticated) {
      redirectToLoginPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAuthenticated]);

  const handleLogout = async () => {
    setAuthLoading(true);
    await authLogout();
    await router.push("/login").then(() => {
      setAuthLoading(false);
      toast({
        title: MSG_LOGOUT_SUCCESSFUL,
        status: TOAST_STATUS_SUCCESS,
        duration: DEFAULT_TOAST_DURATION,
      });
    });
  };

  const isLoaded = !(authLoading || !isAuthenticated);

  return (
    <Skeleton isLoaded={isLoaded}>
      <h1>Hello NextJS</h1>
      <br />
      <Button onClick={handleLogout}>LOGOUT</Button>
    </Skeleton>
  );
};

export default Home;
