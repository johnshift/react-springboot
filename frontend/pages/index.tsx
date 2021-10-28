import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";

import Layout from "../components/Layout";
import CreatePost from "../components/CreatePost";

const Feed = () => (
  <Box border="1px solid tomato" h="2100px">
    Feed
  </Box>
);

const Page = () => {
  return (
    <>
      <CreatePost />
      <Feed />
    </>
  );
};
export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav>{page}</Layout>;
};
