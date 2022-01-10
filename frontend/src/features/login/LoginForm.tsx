import { useEffect, useState } from 'preact/hooks';
import Button from '../../components/button';
import * as styles from './login.css';

type Props = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.addEventListener('keydown', closeOnEsc);
    return () => {
      document.body.removeEventListener('keydown', closeOnEsc);
    };
  }, [onClose]);

  return (
    <div class={styles.wrapper}>
      <h1>veils</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username or Email" />

        <div class={styles.passwordField}>
          <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'hide' : 'show'}
          </span>
        </div>

        <div class={styles.actionW}>
          <a href="/register">Create an account</a>
          <Button variants={{ color: 'primary' }}>Login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
