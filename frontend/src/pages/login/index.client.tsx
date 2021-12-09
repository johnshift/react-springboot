import { FormEvent, useEffect, useState } from "react";
import Page from "../../components/layout/Page";
import PageCenter from "../../components/layout/PageCenter";
import { LoginContext } from "../../components/login/LoginContext";
import LoginForm from "../../components/login/LoginForm";
import {
  AUTHORIZATION_KEY,
  MSG_JUST_LOGGED_OUT,
  MSG_PLEASE_LOGIN,
  MSG_SUCCESSFUL_LOGIN,
  TOAST_OPTIONS,
} from "../../lib/constants";
import { MessageResponseT } from "../../lib/types";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../lib/contexts/auth";
import { useRouter } from "next/router";
import Spinner from "../../components/common/Spinner";

const Login = () => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [password, setPassword] = useState("");

  const {
    authLoading,
    authLogin,
    isRedirected,
    setIsRedirected,
    isAuthenticated,
    justLoggedOut,
    setJustLoggedOut,
  } = useAuth();

  useEffect(() => {
    if (isRedirected) {
      setIsRedirected(false);
      toast.dismiss();
      toast(MSG_PLEASE_LOGIN, TOAST_OPTIONS);
    }

    if (isAuthenticated) {
      setIsRedirected(true);
      router.replace("/");
    }

    if (justLoggedOut) {
      setJustLoggedOut(false);
      toast(MSG_JUST_LOGGED_OUT, TOAST_OPTIONS);
    }

    // needs to only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const targetName = e.currentTarget.name;
    const targetValue = e.currentTarget.value;

    if (targetName === "principal") {
      setPrincipal(targetValue);
      return;
    }

    setPassword(targetValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.dismiss();
    toast.loading("Logging in please wait", TOAST_OPTIONS);

    async function apiLogin() {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          principal,
          password,
        }),
      });

      toast.dismiss();
      setIsLoading(false);

      if (response.status !== 200) {
        const { message } = (await response.json()) as MessageResponseT;
        setHasError(true);
        toast.error(message, TOAST_OPTIONS);
      } else {
        setHasError(false);
        toast.success(MSG_SUCCESSFUL_LOGIN, TOAST_OPTIONS);
        const token = response.headers.get(AUTHORIZATION_KEY);
        console.log("login success token: ", token);
        if (token) {
          authLogin(token);
          router.push("/").then(() => {
            alert("ALERT AFTER SUCCESSFUL LOGIN");
          });
        }
      }
    }

    apiLogin();
  };

  return (
    <Page>
      <PageCenter>
        {isAuthenticated ? (
          // remove login flicker when navigating to /login if loggedin
          <Spinner />
        ) : (
          <LoginContext.Provider
            value={{
              isLoading,
              hasError,
              handleSubmit,
              principal,
              password,
              onChangeHandler,
            }}
          >
            <LoginForm />
            <Toaster />
          </LoginContext.Provider>
        )}
      </PageCenter>
    </Page>
  );
};

export default Login;
