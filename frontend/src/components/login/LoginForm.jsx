import { useState } from "preact/hooks";
import { notify } from "../../store/NotificationStore";
import {
  BACKEND_API_URL,
  KEY_AUTHORIZATION,
  MSG_LOADING,
  MSG_SOMETHING_WENT_WRONG,
} from "../lib/constants";

const Skeleton = () => {
  return (
    <div class="animate-pulse pb-1">
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingIndicator(true);
    await new Promise((r) => setTimeout(r, 1000));

    let notifType = "error";
    let notifMessage = MSG_SOMETHING_WENT_WRONG;

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
      notifMessage = "Login successful";
      localStorage.setItem(
        KEY_AUTHORIZATION,
        response.headers.get(KEY_AUTHORIZATION)
      );
    } finally {
      notify(notifMessage, notifType);
      setLoadingIndicator(false);
    }
  };

  const border = hasError ? " border-red-300" : "";
  const inputClassName = "w-full mb-10" + border;

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
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className={inputClassName}
            onChange={handleChange}
            value={payload.password}
          />

          <div className="flex justify-between items-center">
            <div>
              <a href="/signup">Create an account</a>
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
