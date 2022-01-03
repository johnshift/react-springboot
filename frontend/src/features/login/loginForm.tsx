import { h } from "preact";
import { styled } from "@linaria/react";
import { useEffect, useState } from "preact/hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: clamp(300px, 90%, 360px);
  height: 340px;

  background: white;
  padding: 1em;
  border-radius: 0.5em;
  z-index: 1;

  h1 {
    color: var(--clr-red);
    font-size: clamp(2em, 4em, 6em);
    line-height: 0;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0.75em;
  }

  input {
    text-align: center;
  }
`;

const FormW = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;

  > * {
    margin-bottom: 2em;
  }
`;

const PasswordField = styled.div`
  display: flex;
  input {
    border-right: 0;
    border: 1px solid var(--clr-border);
    border-radius: 0.75em 0 0 0.75em;
    min-width: calc(100% - 2em - 3.5em);
    text-indent: 3em;
  }

  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 4em;
    font-size: 0.875rem;
    border: 1px solid var(--clr-border);
    border-left: 0;
    cursor: pointer;
    border-radius: 0 0.75em 0.75em 0;
    flex-basis: 10%;
  }
`;

const ActionW = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5em;
`;

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
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.addEventListener("keydown", closeOnEsc);
    return () => {
      document.body.removeEventListener("keydown", closeOnEsc);
    };
  }, [onClose]);

  return (
    <Wrapper>
      <h1>veils</h1>
      <form onSubmit={handleSubmit}>
        <FormW>
          <input name="principal" placeholder="Username or Email" />

          <PasswordField>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "hide" : "show"}
            </span>
          </PasswordField>

          <ActionW>
            <a href="/register">Create an account</a>

            <button>Login</button>
          </ActionW>
        </FormW>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
