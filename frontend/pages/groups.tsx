import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";

import Head from "next/head";
import Layout from "../components/Layout";

const Page = () => {
  return (
    <>
      <Head>
        <title>Groups</title>
      </Head>
      <Box border="1px solid tomato" h="2100px">
        Groups Page
      </Box>
    </>
  );
};
export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav>{page}</Layout>;
};
