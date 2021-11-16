import { ReactElement, useEffect, useLayoutEffect } from "react";

import Head from "next/head";
import Layout from "../../components/layout/CenterPage";
import LoginForm from "../../features/auth/LoginForm";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { sessionAtom } from "../../recoil/auth/atom";

const Page = () => {
  const router = useRouter();
  const sessionState = useRecoilValue(sessionAtom);
  console.log("Login Page sessionState: ", sessionState);
  // if (sessionState !== null) {
  //   // TODO: redirect to home page
  //   router.replace("/");
  // }

  return (
    <>
      <Head>
        <title>Veils App</title>
      </Head>
      <LoginForm />
    </>
  );
};
export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav={false}>{page}</Layout>;
};
