import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Button from '../../components/button';
import Input from '../../components/input';
import { useNotif } from '../../components/notification/store';
import { ErrorMsg } from '../../components/notification/types';
import {
  BACKEND_API_URL,
  MSG_SOMETHING_WENT_WRONG,
  REGEXP_EMAIL,
  REGEXP_NEAT_URI,
} from '../../constants';
import { sleep } from '../../utils/sleep';
import { MSG_INCORRECT_LOGIN } from './constants';
import * as styles from './login.css';
import LoginFormSkeleton from './LoginFormSkeleton';

type Props = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    principal: '',
    password: '',
  });

  const { notifyLoading, notifyError } = useNotif();

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

  if (loading) {
    return <LoginFormSkeleton />;
  }

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setPayload({
      ...payload,
      [target.name]: target.value,
    });
  };

  const showLoading = (isLoading: boolean) => {
    setLoading(isLoading);
    if (isLoading) {
      notifyLoading(() => setLoading(false));
    }
  };

  const showError = (err: ErrorMsg) => {
    showLoading(false);
    setHasError(err !== MSG_SOMETHING_WENT_WRONG);
    notifyError(err);
  };

  const isValid = () => {
    const { principal, password } = payload;

    const MIN_PRINCIPAL_LENGTH = 4;
    const MIN_PASSWORD_LENGTH = 6;
    const MAX_LOGIN_INPUT_LENGTH = 64;

    if (!principal) {
      return false;
    }

    if (!password) {
      return false;
    }

    if (principal.length < MIN_PRINCIPAL_LENGTH || principal.length > MAX_LOGIN_INPUT_LENGTH) {
      return false;
    }

    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_LOGIN_INPUT_LENGTH) {
      return false;
    }

    if (!REGEXP_NEAT_URI.test(principal) && !REGEXP_EMAIL.test(principal)) {
      return false;
    }

    return true;
  };

  const login = () => {
    return new Promise<Function>((resolve) => {
      const exec = async () => {
        const KEY_AUTHORIZATION = 'authorization';

        let errmsg = MSG_SOMETHING_WENT_WRONG;

        try {
          const response = await fetch(`${BACKEND_API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(payload),
          });

          // login with errors
          if (!response.ok) {
            const { message } = await response.json();
            errmsg = message;
            throw errmsg;
          }

          // successful login
          localStorage.setItem(KEY_AUTHORIZATION, response.headers.get(KEY_AUTHORIZATION)!);
          window.location.replace('/');
        } catch (e) {
          resolve(() => showError(errmsg));
        }
      };

      return exec();
    });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!isValid()) {
      showError(MSG_INCORRECT_LOGIN);
      return;
    }

    showLoading(true);

    // get rid of flicker loading
    // await sleep();

    await Promise.all([login(), sleep(300)]).then(([fn]) => {
      if (fn) {
        fn();
      }
    });
  };

  return (
    <div class={styles.wrapper}>
      <h1>veils</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="principal"
          placeholder="Username or Email"
          onChange={handleChange}
          value={payload.principal}
          hasError={hasError}
        />

        <div class={styles.passwordField} data-has-error={hasError}>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={handleChange}
            value={payload.password}
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
