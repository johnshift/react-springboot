import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import PageLoader from "../components/PageLoader";
import loadable from "@loadable/component";
import Head from "next/head";

const LoginForm = loadable(() => import("../features/login/LoginForm"), {
  fallback: <PageLoader />,
});

const XXX = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Head>
        <title>Veils App</title>
        <meta
          name="description"
          content="Share your darkest secrets - FEARLESSLY!"
        />
      </Head>
      <h1>hello</h1>

      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <Button variant="contained" onClick={() => setShowLogin(true)}>
          show login
        </Button>
      </div>
      <Dialog
        onClose={() => setShowLogin(false)}
        open={showLogin}
        PaperProps={{
          sx: {
            margin: 0,
          },
        }}
      >
        <LoginForm />
      </Dialog>
    </div>
  );
};

export default XXX;
