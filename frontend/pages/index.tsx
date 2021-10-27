import { ReactElement } from "react";

import Layout from "./layout";

const Page = () => {
  return <h1>Home</h1>;
};
export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav>{page}</Layout>;
};
