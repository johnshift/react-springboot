import { ReactElement } from "react";

import Head from "next/head";
import Layout from "../common/components/Layout";
import LoginForm from "../modules/auth/LoginForm";

const Page = () => {
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
  return <Layout showNav>{page}</Layout>;
};
