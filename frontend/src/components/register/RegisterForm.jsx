import { h } from "preact";
import { useState } from "preact/hooks";
import { notify } from "../../store/NotificationStore";
import {
  MSG_LOADING,
  MSG_INVALID_USERNAME,
  MSG_INVALID_EMAIL,
  MSG_INVALID_PASSWORD,
  MSG_INVALID_NAME,
  MSG_INVALID_VEIL,
  MSG_SOMETHING_WENT_WRONG,
  DEFAULT_FIELD_ERR,
  REGEXP_VALID_PRINCIPAL,
  REGEXP_VALID_NAME,
  REGEXP_EMAIL,
  MIN_PASSWORD_LENGTH,
  MAX_LOGIN_INPUT_LENGTH,
  MIN_PRINCIPAL_LENGTH,
  MAX_NAME_LENGTH,
  BACKEND_API_URL,
  MSG_REGISTER_SUCCESSFUL,
  KEY_AUTHORIZATION,
} from "../../lib/constants";

const Skeleton = () => {
  return (
    <div
      id="register-skeleton"
      class="animate-pulse p-10 py-11 rounded-lg shadow-md w-11/12 lg:w-9/12 hd:w-8/12 border border-gray-300"
    >
      <div class="bg-gray-300 w-full mb-8 h-12 rounded-lg" />
      <div class="bg-gray-300 w-full mb-8 h-12 rounded-lg" />
      <div class="bg-gray-300 w-full mb-8 h-12 rounded-lg" />
      <div class="bg-gray-300 w-full mb-8 h-12 rounded-lg" />
      <div class="bg-gray-300 w-full mb-8 h-12 rounded-lg" />
      <div className="flex justify-between items-center">
        <div class="bg-gray-300 w-6/12 h-6" />
        <div class="bg-gray-300 w-24 px-4 h-10 rounded-lg" />
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <Skeleton />;
  }

  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    veil: "",
  });

  const [togglePassword, setTogglePassword] = useState({
    showPassword: false,
    showVeil: false,
  });

  const [fieldErr, setFieldErr] = useState(DEFAULT_FIELD_ERR);

  const { username, email, password, name, veil } = payload;

  const setLoadingIndicator = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      notify(MSG_LOADING, "loading");
    }
  };

  const validate = async () => {
    if (!REGEXP_VALID_PRINCIPAL.test(username)) {
      return { field: 0, err: MSG_INVALID_USERNAME };
    }

    if (!REGEXP_EMAIL.test(email) || email.length < MIN_PRINCIPAL_LENGTH) {
      return { field: 1, err: MSG_INVALID_EMAIL };
    }

    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_LOGIN_INPUT_LENGTH
    ) {
      return { field: 2, err: MSG_INVALID_PASSWORD };
    }

    if (
      !REGEXP_VALID_NAME.test(name) ||
      name.length < MIN_PRINCIPAL_LENGTH ||
      name.length > MAX_NAME_LENGTH
    ) {
      return { field: 3, err: MSG_INVALID_NAME };
    }

    if (
      !REGEXP_VALID_PRINCIPAL.test(veil) ||
      veil.length < MIN_PRINCIPAL_LENGTH ||
      veil.length > MAX_NAME_LENGTH
    ) {
      return { field: 4, err: MSG_INVALID_VEIL };
    }

    return null;
  };

  const getFieldErrNum = (errmsg) => {
    if (errmsg.toLowerCase().includes("username")) {
      return 0;
    }

    if (errmsg.toLowerCase().includes("email")) {
      return 1;
    }

    if (errmsg.toLowerCase().includes("veil")) {
      return 4;
    }

    return -1;
  };

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErr = await validate();
    if (validateErr) {
      setFieldErr(validateErr);
      notify(validateErr.err, "error");
      return;
    } else {
      setFieldErr(DEFAULT_FIELD_ERR);
    }

    setLoadingIndicator(true);
    // await new Promise((r) => setTimeout(r, 1000));

    let fieldNum = -1;
    let notifType = "error";
    let notifMessage = MSG_SOMETHING_WENT_WRONG;

    try {
      const response = await fetch(BACKEND_API_URL + "/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // login with errors
      if (!response.ok) {
        const { message } = await response.json();
        fieldNum = getFieldErrNum(message);
        setFieldErr({ field: fieldNum, err: message });
        notifMessage = message;
        return;
      }

      // successful register
      notifType = "success";
      notifMessage = MSG_REGISTER_SUCCESSFUL;
      localStorage.setItem(
        KEY_AUTHORIZATION,
        response.headers.get(KEY_AUTHORIZATION)
      );
    } finally {
      notify(notifMessage, notifType);

      if (notifMessage === MSG_REGISTER_SUCCESSFUL) {
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      } else {
        setLoadingIndicator(false);
      }
    }
  };

  const errBorder = " border-red-300";
  const inputClass = "w-full mb-8";
  const passwordClass =
    "rounded-none rounded-l-lg block flex-1 min-w-0 w-full border-r-0";

  return (
    <div class="p-10 rounded-lg shadow-md w-11/12 lg:w-9/12 hd:w-8/12 border border-gray-300">
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          className={fieldErr.field !== 0 ? inputClass : inputClass + errBorder}
          onChange={handleChange}
          value={username}
          autoFocus
        />

        <input
          name="email"
          placeholder="Email address"
          className={fieldErr.field !== 1 ? inputClass : inputClass + errBorder}
          onChange={handleChange}
          value={email}
        />

        <div class="flex w-full mb-8">
          <input
            name="password"
            type={togglePassword.showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className={
              fieldErr.field !== 2 ? passwordClass : passwordClass + errBorder
            }
          />
          <span
            aria-label="show password"
            onClick={() => {
              setTogglePassword({
                ...togglePassword,
                showPassword: !togglePassword.showPassword,
              });
            }}
            class="w-[60px] inline-flex items-center justify-center text-sm lg:text-md bg-gray-200 rounded-r-md border border-l-0 border-gray-300 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100 select-none"
          >
            {togglePassword.showPassword ? "hide" : "show"}
          </span>
        </div>

        <input
          name="name"
          placeholder="Full Name"
          className={fieldErr.field !== 3 ? inputClass : inputClass + errBorder}
          onChange={handleChange}
          value={name}
        />

        <div class="flex w-full mb-8">
          <input
            name="veil"
            type={togglePassword.showVeil ? "text" : "password"}
            placeholder="Veil name"
            value={veil}
            onChange={handleChange}
            className={
              fieldErr.field !== 4 ? passwordClass : passwordClass + errBorder
            }
          />
          <span
            aria-label="show veil name"
            onClick={() => {
              setTogglePassword({
                ...togglePassword,
                showVeil: !togglePassword.showVeil,
              });
            }}
            class="w-[60px] inline-flex items-center justify-center text-sm lg:text-md bg-gray-200 rounded-r-md border border-l-0 border-gray-300 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100 select-none"
          >
            {togglePassword.showVeil ? "hide" : "show"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <a href="/login">Already have an account?</a>
          </div>
          <div>
            <button
              type="submit"
              className="w-24 text-white font-semibold bg-red-700 hover:bg-red-600 hover:text-white "
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
