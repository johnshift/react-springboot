import { ReactElement } from "react";

import Head from "next/head";
import Layout from "../src/components/Layout";
import LoginForm from "../src/components/LoginForm";

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
