import { h } from "preact";
import { useState } from "preact/hooks";
import { notify } from "../../store/NotificationStore";
import {
  BACKEND_API_URL,
  KEY_AUTHORIZATION,
  MAX_LOGIN_INPUT_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_PRINCIPAL_LENGTH,
  MSG_INCORRECT_LOGIN,
  MSG_LOADING,
  MSG_LOGIN_SUCCESSFUL,
  MSG_SOMETHING_WENT_WRONG,
  REGEXP_EMAIL,
  REGEXP_NEAT_URI,
} from "../../lib/constants";

const Skeleton = () => {
  return (
    <div class="animate-pulse pb-1" id="login-skeleton">
      <div class="bg-gray-300 w-full mb-10 h-12 rounded-lg" />
      <div class="bg-gray-300 w-full mb-10 h-12 rounded-lg" />
      <div className="flex justify-between items-center">
        <div class="bg-gray-300 w-6/12 h-6" />
        <div class="bg-gray-300 w-24 px-4 h-10 rounded-lg" />
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [payload, setPayload] = useState({
    principal: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const setLoadingIndicator = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      notify(MSG_LOADING, "loading");
    }
  };

  const validate = async (principal, password) => {
    if (!principal) {
      return MSG_INCORRECT_LOGIN;
    }

    if (!password) {
      return MSG_INCORRECT_LOGIN;
    }

    if (
      principal.length < MIN_PRINCIPAL_LENGTH ||
      principal.length > MAX_LOGIN_INPUT_LENGTH
    ) {
      return MSG_INCORRECT_LOGIN;
    }

    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_LOGIN_INPUT_LENGTH
    ) {
      return MSG_INCORRECT_LOGIN;
    }

    // match regexp !neat_uri && !email
    if (!REGEXP_NEAT_URI.test(principal) && !REGEXP_EMAIL.test(principal)) {
      return MSG_INCORRECT_LOGIN;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let notifType = "error";
    let notifMessage = MSG_SOMETHING_WENT_WRONG;

    const errmsg = await validate(payload.principal, payload.password);
    if (errmsg) {
      notify(errmsg, "error");
      setHasError(true);
      setLoadingIndicator(false);
      return;
    } else {
      setHasError(false);
    }

    setLoadingIndicator(true);
    await new Promise((r) => setTimeout(r, 1000));

    try {
      const response = await fetch(BACKEND_API_URL + "/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // login with errors
      if (!response.ok) {
        const { message } = await response.json();
        setHasError(true);
        notifMessage = message;
        return;
      }

      // successful login
      notifMessage = MSG_LOGIN_SUCCESSFUL;
      notifType = "success";
      localStorage.setItem(
        KEY_AUTHORIZATION,
        response.headers.get(KEY_AUTHORIZATION)
      );
    } finally {
      notify(notifMessage, notifType);

      if (notifMessage === MSG_LOGIN_SUCCESSFUL) {
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      } else {
        // only display form back if not successful
        setLoadingIndicator(false);
      }
    }
  };

  const border = hasError ? " border-red-300" : "";
  const inputClassName = "w-full mb-10" + border;
  const passwordClassName =
    "rounded-none rounded-l-lg block flex-1 min-w-0 w-full border-r-0" + border;

  return (
    <div class="p-10 rounded-lg shadow-md w-11/12 lg:w-9/12 hd:w-8/12 border border-gray-300">
      {loading ? (
        <Skeleton />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="principal"
            placeholder="Username or Email"
            className={inputClassName}
            onChange={handleChange}
            value={payload.principal}
            autoFocus
          />

          <div class="flex w-full mb-8">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={payload.password}
              onChange={handleChange}
              class={passwordClassName}
            />
            <span
              aria-label="show password"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              class="w-[60px] inline-flex items-center justify-center text-sm lg:text-md bg-gray-200 rounded-r-md border border-l-0 border-gray-300 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100 select-none"
            >
              {showPassword ? "hide" : "show"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <a href="/register">Create an account</a>
            </div>
            <div>
              <button
                type="submit"
                className="w-24 text-white font-semibold bg-red-700 hover:bg-red-600 hover:text-white "
              >
                Login
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
