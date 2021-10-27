import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";

import Layout from "../components/Layout";

const Page = () => {
  return <Box>Home</Box>;
};
export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav>{page}</Layout>;
};
