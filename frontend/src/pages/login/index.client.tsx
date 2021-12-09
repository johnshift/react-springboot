import { FormEvent, useEffect, useState } from "react";
import Page from "../../components/layout/Page";
import PageCenter from "../../components/layout/PageCenter";
import { LoginContext } from "../../components/login/LoginContext";
import LoginForm from "../../components/login/LoginForm";
import {
  AUTHORIZATION_KEY,
  MSG_ALREADY_LOGGEDIN,
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

  const { authLogin, isAuthenticated, authLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/").then(() => {
        toast(MSG_ALREADY_LOGGEDIN, TOAST_OPTIONS);
      });
    }

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
        const token = response.headers.get(AUTHORIZATION_KEY);
        console.log("login success token: ", token);
        if (token) {
          authLogin(token);
          router.push("/").then(() => {
            toast.success(MSG_SUCCESSFUL_LOGIN, TOAST_OPTIONS);
          });
        }
      }
    }

    apiLogin();
  };

  return (
    <Page>
      <PageCenter>
        {authLoading || isAuthenticated ? (
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
