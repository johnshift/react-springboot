import { ReactElement, useEffect } from "react";

import Head from "next/head";
import Layout from "../components/layout/WithSidebar";

import Feed from "../features/feed";
import { useRecoilState } from "recoil";
import { sessionAtom } from "../recoil/auth/atom";
import { SessionT } from "../types";
import { AUTH_LOGIN_URL } from "../constants";
import axios from "axios";
import { useRouter } from "next/router";

const Page = () => {
  // const router = useRouter();

  const [session, setSession] = useRecoilState(sessionAtom);
  // if (session === null) {
  //   router.replace("/login");
  // }

  // useEffect(() => {
  //   // WARNING: REMOVE THIS ON FINAL PRODUCTION CODE!
  //   // if on dev, loggedin as 'johnsmith'
  //   if (
  //     process.env.NODE_ENV === "development" ||
  //     process.env.NODE_ENV === "test"
  //   ) {
  //     if (session === null) {
  //       axios
  //         .post<SessionT>(AUTH_LOGIN_URL, {
  //           username: "johnsmith",
  //           password: "asdfjkl;",
  //         })
  //         .then(({ data }) => {
  //           setSession(data);
  //           console.log("homepage auto-login data: ", data);
  //           axios.defaults.headers.common["X-CSRF-TOKEN"] = data.csrfToken;
  //         });
  //     }
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Veils App</title>
      </Head>
      <Feed />
    </>
  );
};
export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav>{page}</Layout>;
};
