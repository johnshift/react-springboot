import { ReactElement } from "react";

import Head from "next/head";
import Layout from "../components/Layout";

import Feed from "../features/feed";

const Page = () => {
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
