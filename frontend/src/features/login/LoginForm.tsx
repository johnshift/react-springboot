import { useEffect, useState } from 'preact/hooks';
import Button from '../../components/button';
import Input from '../../components/input';
import { inputSkeleton } from '../../components/input/input.css';
import * as styles from './login.css';

type Props = {
  onClose: () => void;
};

export const Skeleton = () => {
  return (
    <div class={styles.wrapper}>
      <h1>veils</h1>
      <form>
        <div class={inputSkeleton} />

        <div class={inputSkeleton} />

        <div class={styles.actionW}>
          <div class={styles.skeletonLink} />
          <div class={styles.skeletonLoginButton} />
        </div>
      </form>
    </div>
  );
};

const LoginForm = ({ onClose }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

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
        <Input placeholder="Username or Email" />

        <div class={styles.passwordField}>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            hasError={hasError}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            role="button"
            aria-label="show password"
          >
            {showPassword ? 'hide' : 'show'}
          </span>
        </div>

        <div class={styles.actionW}>
          <a href="/register">Create an account</a>
          <Button variant="primary">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
