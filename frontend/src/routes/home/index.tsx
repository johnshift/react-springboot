import { FunctionalComponent, h } from "preact";
import { lazy, Suspense } from "preact/compat";

import { useState } from "preact/hooks";
import Modal from "../../components/modal";
import { prerenderSuspense } from "../../utils";

import * as styles from "./home.css";

const Btn = lazy(() => import("../../components/button"));
const Pakyu = lazy(() => import("./pakyu"));

const Loading = () => <h1>Loading btn ...</h1>;

const Home: FunctionalComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const close = () => setShowLogin(false);

  return (
    <div>
      <h1>Home</h1>
      <p>This is the Home component.</p>

      <div class={styles.showLoginContainer}>
        {prerenderSuspense(
          <Btn
            onClick={() => setShowLogin(true)}
            // buttonProps={{ color: "primary" }}
          >
            show login
          </Btn>,
          <Loading />
        )}
      </div>

      {prerenderSuspense(
        <Pakyu />,
        <h1>loading pakyu ...</h1>,
        <h1>pakyu fallback</h1>
      )}

      <Modal show={showLogin} onClose={close}>
        <Suspense fallback={<h1>loading pakyu ...</h1>}>
          <Pakyu />
        </Suspense>
      </Modal>
    </div>
  );
};

export default Home;
