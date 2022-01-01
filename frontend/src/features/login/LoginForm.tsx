import { FormEvent, useEffect, useState } from "react";

import styles from "./login.module.css";

type Props = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.addEventListener("keydown", closeOnEsc);
    return () => {
      document.body.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>veils</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formW}>
          <input name="principal" placeholder="Username or Email" />

          <div style={{ display: "flex" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={styles.password}
            />
            <span
              className={styles.showPass}
              onClick={() => setShowPassword(!showPassword)}
            >
              show
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "0.5em",
            }}
          >
            <a href="/register">Create an account</a>

            <button>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
