import { ReactElement } from "react";
// import { Box } from "@chakra-ui/react";

import Head from "next/head";
import Layout from "../common/components/Layout";
import CreatePost from "../modules/post/CreatePost";

const Page = () => {
  return (
    <>
      <Head>
        <title>Veils App</title>
      </Head>
      <CreatePost />
    </>
  );
};
export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav>{page}</Layout>;
};
