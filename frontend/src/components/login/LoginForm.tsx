import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import {
  JSON_HEADERS,
  KEY_AUTHORIZATION,
  LOGIN_API_URL,
  MSG_SOMETHING_WENT_WRONG,
  MSG_SUCCESSFUL_LOGIN,
  TOAST_OPTIONS,
} from "../../lib/constants";

type LoginData = {
  principal: string;
  password: string;
};

const LoginForm = () => {
  const [payload, setPayload] = useState<LoginData>({
    principal: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    clear();
    setLoading(true);
    toast.loading("Loading please wait", TOAST_OPTIONS);

    let loginErr = false;
    let message = MSG_SOMETHING_WENT_WRONG;

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: JSON_HEADERS,
      });

      // login with errors
      if (!response.ok) {
        const jsonResp = await response.json();
        throw jsonResp.message;
      }

      // successful login
      message = MSG_SUCCESSFUL_LOGIN;
      localStorage.setItem(
        KEY_AUTHORIZATION,
        response.headers.get(KEY_AUTHORIZATION)
      );
    } catch (errmsg) {
      loginErr = true;
      if (typeof errmsg === "string") {
        setHasError(true);
        message = errmsg;
      }
    } finally {
      if (loginErr || message === MSG_SOMETHING_WENT_WRONG) {
        toast.error(message, TOAST_OPTIONS);
      } else {
        toast.success(message, TOAST_OPTIONS);
      }
      setLoading(false);
    }
  };

  const clear = () => {
    setHasError(false);
  };

  const border = hasError ? " border-red-300" : " ";
  const inputClassName = "w-full mb-10" + border;

  return (
    <form onSubmit={handleSubmit} className={loading ? "disable" : ""}>
      <input
        placeholder="Username or Email"
        className={inputClassName}
        onChange={handleChange}
        name="principal"
        disabled={loading}
        onFocus={clear}
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        className={inputClassName}
        onChange={handleChange}
        disabled={loading}
        onFocus={clear}
      />

      <div className="flex justify-between items-center">
        <div>
          <a href="/signup">Create an account</a>
        </div>
        <div>
          <button
            disabled={loading}
            type="submit"
            className="w-24 text-white font-semibold bg-red-700 hover:bg-red-600 hover:text-white "
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
