import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../src/components/Layout";

import { useRouter } from "next/router";

type prettyUrlInfo = {
  name: string;
  type: string;
};

// mimic server request
// query db to return info if url is user, veil or group
const getPrettyUrlInfo = (
  url: string | string[] | undefined
): prettyUrlInfo => {
  if (url === "user_1") {
    return { name: url as string, type: "USER" };
  }

  if (url === "veil_1") {
    return { name: url as string, type: "VEIL" };
  }

  if (url === "group_1") {
    return { name: url as string, type: "GROUP" };
  }

  return { name: url as string, type: "NOT_FOUND" };
};

const Page = () => {
  const router = useRouter();
  const prettyUrlInfo = getPrettyUrlInfo(router.query["pretty"]);

  if (prettyUrlInfo.type === "USER") {
    return (
      <>
        <Head>
          <title>John Doe | Veils</title>
        </Head>
        <Box>User Profile</Box>
      </>
    );
  }

  if (prettyUrlInfo.type === "VEIL") {
    return (
      <>
        <Head>
          <title>grapeapple | Veils</title>
        </Head>
        <Box>Veil Profile</Box>
      </>
    );
  }

  if (prettyUrlInfo.type === "GROUP") {
    return (
      <>
        <Head>
          <title>Flat Earthers | Veils</title>
        </Head>
        <Box>Group Page</Box>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Page not found · Veils</title>
      </Head>
      <Box>Not Found :(</Box>
    </>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout showNav>{page}</Layout>;
};
