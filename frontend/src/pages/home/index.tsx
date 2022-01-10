import { Link } from 'preact-router';
import * as styles from './home.css';

import Button from '../../components/button';
import { useState } from 'preact/hooks';
import Modal from '../../components/modal';
import LoginForm from '../../features/login/LoginForm';

const LoginButton = () => {
  const [showLogin, setShowLogin] = useState(false);
  const close = () => setShowLogin(false);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
        }}
      >
        <Button onClick={() => setShowLogin(true)}>login</Button>
      </div>

      <Modal show={showLogin} onClose={close}>
        <LoginForm onClose={close} />
      </Modal>
    </>
  );
};

const Page = () => (
  <div>
    <LoginButton />

    <h1 class={styles.title}>Home Page</h1>
    <p>home page</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <Link href="/profile">PROFILE</Link>
  </div>
);

export default Page;
