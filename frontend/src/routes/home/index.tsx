import { FunctionalComponent, h } from "preact";
import { Suspense, lazy } from "preact/compat";
import { useState } from "preact/hooks";
import Modal from "../../components/modal";

import { useToast } from "../../components/toast/store";
import { styled } from "@linaria/react";

const Title = styled.h1`
  color: red;
`;

const LoginForm = lazy(() => import("../../features/login/loginForm"));

const Home: FunctionalComponent = () => {
  const { error } = useToast();

  const [showLogin, setShowLogin] = useState(false);
  const closeLogin = () => setShowLogin(false);

  return (
    <div>
      <Title>Home</Title>
      <button onClick={() => error("Incorrect username/email or password")}>
        toggle notif
      </button>

      <Modal onClose={closeLogin} show={showLogin}>
        <Suspense fallback={null}>
          <LoginForm onClose={closeLogin} />
        </Suspense>
      </Modal>

      <div
        style={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
          cursor: "pointer",
        }}
        onClick={() => setShowLogin(true)}
      >
        show login
      </div>
    </div>
  );
};

export default Home;
