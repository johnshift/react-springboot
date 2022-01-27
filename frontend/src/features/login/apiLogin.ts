import axios from "axios";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { LOGIN_MSG_OK } from "./constants";
import { LoginPayload } from "./types";

const apiLogin = async (payload: LoginPayload): Promise<[boolean, string]> => {
  const KEY_AUTHORIZATION = "authorization";

  let success = false;
  let msg = MSG_SOMETHING_WENT_WRONG;

  try {
    const res = await axios.post(`${BACKEND_API_URL}/login`, {
      principal: payload.principal,
      password: payload.password,
    });

    const token = res.headers[KEY_AUTHORIZATION];
    localStorage.setItem(KEY_AUTHORIZATION, token);

    success = true;
    msg = LOGIN_MSG_OK;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      msg = err.response.data.message;
    }
  }

  return Promise.resolve([success, msg]);
};

export default apiLogin;
