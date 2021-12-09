import { NextPage } from "next";
import { Suspense } from "react";
import Token from "../components/home/Token.client";
import Page from "../components/layout/Page";

const Home: NextPage = () => {
  return (
    <Page>
      <Suspense fallback={<h1>Home Page Loading ...</h1>}>
        <Token />
      </Suspense>
    </Page>
  );
};

export default Home;
