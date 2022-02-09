import axios from "axios";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";

const apiRegister = async ({
  username,
  email,
  password,
  firstname,
  lastname,
  veil,
  desc,
  veildesc,
}: RegisterPayload): Promise<[boolean, string]> => {
  let success = false;
  let msg = MSG_SOMETHING_WENT_WRONG;

  try {
    await axios.post(`${BACKEND_API_URL}/register`, {
      username,
      email,
      password,
      name: `${firstname} ${lastname}`,
      veil,
      description: desc,
      veilDescription: veildesc,
    });

    success = true;
    msg = "Success! Please check your email for verification.";
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      msg = err.response.data.message;
    }
    return Promise.resolve([false, msg]);
  }

  return Promise.resolve([success, msg]);
};

export default apiRegister;
