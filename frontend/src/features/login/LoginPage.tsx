import React, { lazy, Suspense, useState } from "react";
import DelayedFallback from "../../components/DelayedFallback";
import Modal from "../../components/Modal";

const Form = lazy(() => import("./LoginForm"));

const LoginPage = () => {
  const [show, setShow] = useState(false);

  const close = () => setShow(false);

  return (
    <>
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        Show Login
      </button>
      <Modal onClose={close} show={show}>
        <Suspense
          fallback={
            <DelayedFallback>
              <h1>login loading</h1>
            </DelayedFallback>
          }
        >
          <Form onClose={close} />
        </Suspense>
      </Modal>
    </>
  );
};

export default LoginPage;
