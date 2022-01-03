import { FunctionalComponent, h } from "preact";
import { lazy, Suspense } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import Modal from "../../components/modal";

interface Props {
  user: string;
}

const LoginForm = lazy(() => import("../../features/login/loginForm"));

const Profile: FunctionalComponent<Props> = (props: Props) => {
  const { user } = props;
  const [time, setTime] = useState<number>(Date.now());
  const [count, setCount] = useState<number>(0);

  // gets called when this route is navigated to
  useEffect(() => {
    const timer = window.setInterval(() => setTime(Date.now()), 1000);

    // gets called just before navigating away from the route
    return (): void => {
      clearInterval(timer);
    };
  }, []);

  // update the current time
  const increment = (): void => {
    setCount(count + 1);
  };

  const [showLogin, setShowLogin] = useState(false);
  const closeLogin = () => setShowLogin(false);

  return (
    <div>
      <h1>Profile: {user}</h1>
      <p>This is the user profile for a user named {user}.</p>

      <div>Current time: {new Date(time).toLocaleString()}</div>

      <p>
        <button onClick={increment}>Click Me</button> Clicked {count} times.
      </p>

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

export default Profile;
