import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import Button from "@mui/material/Button";

import LoginFormDialog from "../features/login/LoginFormDialog";

const Home: NextPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Head>
        <title>Veils App</title>
        <meta
          name="description"
          content="Share your darkest secrets - FEARLESSLY!"
        />
      </Head>

      <h1>Hello final-stack!</h1>

      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <Button variant="contained" onClick={() => setShowLogin(true)}>
          show login
        </Button>
      </div>

      <LoginFormDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Home;
