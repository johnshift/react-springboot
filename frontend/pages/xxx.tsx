import { useState } from "react";
import Head from "next/head";

import Button from "@mui/material/Button";

import LoginForm from "../features/login/LoginForm";

const Skeleton = () => {
  return <h1>waitx ...</h1>;
};

const XXX = () => {
  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow(true);
  }, 1000);

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 1000);
  };

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
        <Button onClick={handleClick}>toggle</Button>
      </div>

      <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
        {show ? <LoginForm /> : <Skeleton />}
      </div>
    </div>
  );
};

export default XXX;
