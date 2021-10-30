import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";

import Head from "next/head";
import Layout from "../src/components/Layout";

const Page = () => {
  return (
    <>
      <Head>
        <title>Recents</title>
      </Head>
      <Box border="1px solid tomato" h="2100px">
        Recents Page
      </Box>
    </>
  );
};
export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav>{page}</Layout>;
};
